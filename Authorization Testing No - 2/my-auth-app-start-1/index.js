import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'

dotenv.config()

const uri = process.env.MONGO
const client = new MongoClient(uri)
const secretKey= process.env.ACCESS
const port = process.env.PORT

const app = express()

app.use(express.json())

app.get('/token', async (req, res) => 
{
    await client.connect()

    const database = client.db('prisma')

    const collection = database.collection('Email')

    const users = await collection.find({}).toArray()

    const tokens = users.map(user => ({

        user: user.email,
        token: jwt.sign({email: user.email}, secretKey)

    }))

    res.status(200).json(tokens)
})

app.post('/verify', (req, res) => 
{
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if(!token) {
       
       return res.status(403).send('token is required')
    
    }

    const decode = jwt.verify(token, secretKey)

    res.status(200).json({ decode })
})

app.listen(port, () =>
{
    console.log(`http://localhost:${port}`);
})