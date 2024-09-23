import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 5000

app.get('/data', (req, res) => 
{
    fs.readFile('Data.json', 'utf8', (err, data) => 
    {
        const jsonData = JSON.parse(data)

        res.json(jsonData)
    })
})

app.post('/data', (req, res) => 
{
    const newEntry = req.body

    fs.writeFile('Data.json', 'utf8', (err, data) =>
    {
        const jsonData = JSON.parse(data)

        jsonData.push(newEntry)

        fs.writeFile('Data.json', JSON.stringify(jsonData, null, 2), () => {
            res.status(201).send(newEntry)
        })
    })
})

app.listen(port, () => 
{
    console.log(`Server running on http://localhost:${port}`);
})