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
    const { id } = req.params

    try {
        const database = client.db('prisma')
        const adminCollection = database.collection('admin')
        const mainstreamCollection = database.collection('mainstream')

        const parsedId = parseInt(id, 10)  // Parse the ID

        // Delete the card from the admin collection
        const resultAdmin = await adminCollection.deleteOne({ id: parsedId })

        if (resultAdmin.deletedCount === 1) {
            // Delete the card from the mainstream collection
            const resultMainstream = await mainstreamCollection.deleteOne({ id: parsedId })

            if (resultMainstream.deletedCount === 1) {
                console.log('Document deleted from mainstream database as well')

                // Update the mainstream.json file
                const __dirname = path.dirname(fileURLToPath(import.meta.url))
                const mainstreamFilePath = path.join(__dirname, 'mainstream.json')

                // Read the current data from the mainstream.json file
                const mainstreamData = JSON.parse(fs.readFileSync(mainstreamFilePath, 'utf-8'))

                // Filter out the deleted card
                const updatedMainstreamData = mainstreamData.filter(card => card.id !== parsedId)

                // Write the updated data back to mainstream.json
                fs.writeFileSync(mainstreamFilePath, JSON.stringify(updatedMainstreamData, null, 2), 'utf-8')

                console.log('Mainstream file updated')
            } else {
                console.log('Document not found in mainstream database')
            }

            // Update the admin.json file
            const __dirname = path.dirname(fileURLToPath(import.meta.url))
            const adminFilePath = path.join(__dirname, 'admin.json')

            // Read the current data from the admin.json file
            const fileData = JSON.parse(fs.readFileSync(adminFilePath, 'utf-8'))

            // Filter out the deleted card
            const updatedAdminData = fileData.filter(card => card.id !== parsedId)

            // Write the updated data back to admin.json
            fs.writeFileSync(adminFilePath, JSON.stringify(updatedAdminData, null, 2), 'utf-8')

            res.status(200).json({ message: 'Document deleted successfully from both collections and files' })
        } else {
            res.status(404).json({ message: 'Document not found in admin collection' })
        }
    } catch (error) {
        console.error('Error occurred:', error)
        res.status(500).json({ message: 'An error occurred while deleting the document' })
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})