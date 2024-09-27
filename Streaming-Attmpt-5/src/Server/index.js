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

    const { useranme } = req.body

    const database = client.db('prisma')
    const collection = database.collection('mainstream')

    const data = await collection.find({}).toArray()

    res.status(200).json(data)

})

app.post('/upload', upload.single('imageFile'), async (req, res) =>
{

    const database = client.db('prisma')
    const mainstreamCollection = database.collection('mainstream')
    
    const { title, description, username } = req.body
    const collection = database.collection(`${username}`)
    const imageFile = req.file ? req.file.filename : null

    const id = Date.now()

    const jsonData = {
        id,
        title,
        description,
        imageFile,
        username
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
    const { id } = req.params;
    const { username } =req.body

    try {
        const database = client.db('prisma');
        const collection = database.collection(`${username}`);
        const mainstreamCollection = database.collection('mainstream');

        const resultCardList = await collection.deleteOne({ id: parseInt(id, 10) });

        if (resultCardList.deletedCount === 1) {
            const resultMainstream = await mainstreamCollection.deleteOne({ id: parseInt(id, 10) });

            if (resultMainstream.deletedCount === 1) {
                console.log('Document deleted from mainstream as well');
            } else {
                console.log('Document not found in mainstream');
            }

            // Correctly use __dirname to write the JSON files
            const __dirname = path.dirname(fileURLToPath(import.meta.url));

            // Update cards.json with the new cardlist data
            const updatedCardlistData = await collection.find({}).toArray();
            const cardListOutputFileName = path.join(__dirname, `${username}`);
            fs.writeFileSync(cardListOutputFileName, JSON.stringify(updatedCardlistData, null, 2), 'utf-8');

            // Update mainstream.json with the new mainstream data
            const updatedMainstreamData = await mainstreamCollection.find({}).toArray();
            const mainstreamOutputFileName = path.join(__dirname, 'mainstream.json');
            fs.writeFileSync(mainstreamOutputFileName, JSON.stringify(updatedMainstreamData, null, 2), 'utf-8');

            // Respond with success message
            res.status(200).json({ message: 'Document deleted successfully from both cardlist and mainstream' });
        } else {
            res.status(404).json({ message: 'Document not found in cardlist' });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the document' });
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})