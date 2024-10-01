import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()
const port = process.env.PORT
const uri = process.env.MONGO_URI

const app = express()
app.use(cors())
app.use(express.json())

const client = new MongoClient(uri)

app.get('/', (req, res) => {
    res.send('API is Running...')
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, `/${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

app.post('/auth',  async (req,res) => 
{
    const { username, password } = req.body

    if(!username || !password) {
        return res.status(400).json({ error: 'username and password are required' })
    }

    const database = client.db('prisma')
    const usersCollection = database.collection('user')

    const existingUser = await usersCollection.findOne({ username })
    if(existingUser) {
        return res.status(400).json({ error: 'username already Exist'})
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = { username, password: hashedPassword }

    await usersCollection.insertOne(newUser)
    
    // const userCollection = database.collection('cardlist')

    // const timestamp = Date.now()

    // const date = new Date(timestamp)

    // const formattedDate = date.toLocaleString()


    // await userCollection.insertOne({ UserLog: `userLoggedAt ${formattedDate}` })

    res.status(201).json({ username })

})

app.post('/login', async(req,res) =>
{
    const { username, password } = req.body
    
    const database = client.db('prisma')
    const usersCollection = database.collection('user') 

    const user = await usersCollection.findOne({username})

    if(user) {
        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch) {

            try {

                const __dirname = path.dirname(fileURLToPath(import.meta.url))
                
                //fetch the user
                const userCollection = database.collection(`${username}`)
                const data = await userCollection.find({}).toArray()
                const outputFileName = path.join(__dirname, `${username}.json`)
                fs.writeFileSync(outputFileName, JSON.stringify(data, null, 2), 'utf-8')

                //fetch the mainstream collection
                const mainstreamCollection = database.collection('mainstream')
                const mainstreamData = await mainstreamCollection.find({}).toArray()
                const mainstreamOutputFileName = path.join(__dirname, 'mainstream.json')
                fs.writeFileSync(mainstreamOutputFileName, JSON.stringify(mainstreamData, null, 2), 'utf-8')

            } catch (error) {
                console.error('failed to write the file')
            }

            res.status(200).json({ message: 'Login Successful', username: user.username })
        } else {
            res.status(401).json({ message: 'Invalid Password' })
        }
    } else {
        res.status(404).json({ message : 'User not found' })
    }
})

app.get('/data',async (req, res) =>
{

    const { username } = req.body

    const database = client.db('prisma')
    const collection = database.collection('mainstream')

    const data = await collection.find({}).toArray()

    res.status(200).json(data)

})

app.post('/upload', upload.single('imageFile'), async (req, res) =>
{

    const database = client.db('prisma')
    const mainstreamCollection = database.collection('mainstream')
    
    const { title, description, username, category, viewedBy, videoUrl } = req.body
    const collection = database.collection(`${username}`)
    const imageFile = req.file ? req.file.filename : null
    const id = Date.now()

    const initalViews = 0
    let postCategory = "New Streamer"

    const jsonData = {
        id,
        title,
        description,
        imageFile,
        username,
        videoUrl,
        views: initalViews,
        category: postCategory,
        viewedBy: viewedBy ? viewedBy : []
    }

    await collection.insertOne(jsonData)
    await mainstreamCollection.insertOne(jsonData)

    const __dirname = path.dirname(fileURLToPath(import.meta.url))

    //Export the collection to a JSON file
    const data = await collection.find({}).toArray()
    const outputFileName = path.join(__dirname, `${username}.json`)
    fs.writeFileSync(outputFileName, JSON.stringify(data, null,2), 'utf-8')

    const mainstreamData = await mainstreamCollection.find({}).toArray()
    const mainstreamOutputFileName = path.join(__dirname, 'mainstream.json')
    fs.writeFileSync(mainstreamOutputFileName, JSON.stringify(mainstreamData, null, 2), 'utf-8')

    res.status(200).json({ message: 'User Data Initialized', jsonData })

})

app.delete('/card/:id', async (req, res) => {
    const { id } = req.params
    const {username} = req.body

    const database = client.db('prisma')
    const adminCollection = database.collection(`${username}`)
    const mainstreamCollection = database.collection('mainstream')

    const parsedId = parseInt(id, 10)  // Parse the ID

    const resultAdmin = await adminCollection.deleteOne({ id: parsedId })

    if (resultAdmin.deletedCount === 1) {
        await mainstreamCollection.deleteOne({ id: parsedId })

        const __dirname = path.dirname(fileURLToPath(import.meta.url))

        // Update mainstream.json
        const mainstreamFilePath = path.join(__dirname, 'mainstream.json')
        const mainstreamData = JSON.parse(fs.readFileSync(mainstreamFilePath, 'utf-8'))
        const updatedMainstreamData = mainstreamData.filter(card => card.id !== parsedId)
        fs.writeFileSync(mainstreamFilePath, JSON.stringify(updatedMainstreamData, null, 2), 'utf-8')

        // Update admin.json
        const adminFilePath = path.join(__dirname, `${username}.json`)
        const fileData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'))
        const updatedAdminData = fileData.filter(card => card.id !== parsedId)
        fs.writeFileSync(adminFilePath, JSON.stringify(updatedAdminData, null, 2), 'utf-8')

        res.status(200).json({ message: 'Document deleted successfully from both collections and files' })
    } else {
        res.status(404).json({ message: 'Document not found' })
    }
})


app.post('/updateViews/:id', async (req, res) => {
    const { username } = req.body;
    const { id } = req.params;

    const database = client.db('prisma');
    const mainstreamCollection = database.collection("mainstream");
    
    try {
        // Check if the document exists in mainstream
        const viewedDoc = await mainstreamCollection.findOne({ id: parseInt(id) });

        if (viewedDoc) {
            // Update the viewedBy array and calculate the new view count
            await mainstreamCollection.updateOne(
                { id: parseInt(id) },
                { $addToSet: { viewedBy: username } } // Add username to viewedBy
            );

            const updatedDoc = await mainstreamCollection.findOne({ id: parseInt(id) });
            const viewsCount = updatedDoc.viewedBy.length;  // Update views based on the length of viewedBy array

            // Update the views field in both collections
            await mainstreamCollection.updateOne(
                { id: parseInt(id) },
                { $set: { views: viewsCount } }
            );


            // Fetch the updated collections
            const updatedMainstream = await mainstreamCollection.find({}).toArray();

            const __dirname = path.dirname(fileURLToPath(import.meta.url));

            // Write the updated mainstream collection to mainstream.json
            const mainstreamFilePath = path.join(__dirname, 'mainstream.json');
            fs.writeFileSync(mainstreamFilePath, JSON.stringify(updatedMainstream, null, 2));

            return res.status(200).json({
                message: "Data updated successfully",
                views: viewsCount,
                updatedMainstream,
            });
        } else {
            return res.status(404).json({ message: "Document not found in mainstream collection" });
        }
    } catch (error) {
        console.error('Error updating collections:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
});




const startServer = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

startServer();
