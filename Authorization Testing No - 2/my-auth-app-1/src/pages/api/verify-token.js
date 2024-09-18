import express from 'express'
import dotenv from 'dotenv'
import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken'


const app = express()
app.use(express.json)

const port = process.env.PORT
const uri = process.env.MONGO_URI
const client = new MongoClient(uri)
const secretKey = process.env.ACCESS_TOKEN_SECRET

app.get('/token', async (req, res) => 
{

    await client.connect()

    const database = client.db('prisma')

    const collection  = database.collection('Email')

    const users = await collection.find({}).toArray()

    const tokens = users.map(user => ({

        token : jwt.sign(user.email,secretKey)

    }))

    res.json(tokens)

})

app.listen(port, () =>
{
    console.log(`http://localhost:${port}`);
})