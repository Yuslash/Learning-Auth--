import express from 'express'

const app = express()

const post = [
    {
        username : 'sibikrishna'
    }
]

app.get('/test', (req, res) => 
{
    res.status(200).json(post)
})

app.listen(3500, () => 
{
    console.log(`http://localhost:3001`)
}) 