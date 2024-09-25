import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import bcrypt from 'bcrypt'
import cors from 'cors'
import multer from 'multer'

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
        cb(null, file.originalname)
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

    
    const userCollection = database.collection('cardlist')

    const timestamp = Date.now()

    const date = new Date(timestamp)

    const formattedDate = date.toLocaleString()


    await userCollection.insertOne({ UserLog: `userLoggedAt ${formattedDate}` })

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

app.post('/upload', upload.single('imageFile'), async (req, res) =>
{

    const database = client.db('prisma')

    const collection = database.collection('cardlist')
    
    const { title, description } = req.body
    const { imageFile } = req.file ? req.file.filename : null

    const id = Date.now()

    const jsonData = {
        id,
        title,
        description,
        imageFile
    }

    await collection.insertOne({ message: 'User Data Initialized', jsonData })

    res.status(200).json({ message: 'User Data Initialized', jsonData })

})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})