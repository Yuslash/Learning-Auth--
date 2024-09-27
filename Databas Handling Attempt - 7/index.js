import express from 'express'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import cors from 'cors'

const uploadDir = 'upload'
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir)
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

dotenv.config()
const uri = process.env.MONGO_URI
const app = express()
app.use(cors())

const client = new MongoClient(uri)

app.get('/data', async (req, res) =>
{
    const { username } = req.query

    const database = client.db('prisma')
    const collection = database.collection('mainstream')

    const data = await collection.find({username}).toArray()

    res.status(200).json(data)
})

app.get('/retrive', async (req, res) =>
{
    const database = client.db('prisma')
    const collection = database.collection('mainstream')

    const data = await collection.find({}).toArray()

    res.status(200).json(data)
})

app.post('/upload',upload.single('imageFile'), async (req, res) =>
{
    const { title, description, username } = req.body
    const imageFile  = req.file ? req.file.path : null

    const id = Date.now()

    const jsonData = {
        id,
        title,
        description,
        imageFile,
        username
    }

    const database = client.db('prisma')
    const collection = database.collection('mainstream')
    
    await collection.insertOne(jsonData)

    res.status(200).json(jsonData)

})

app.listen(5403, () =>
{
    console.log(`Server is Running on http://localhost:5403`);
})