import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const upload = multer({ dest: 'uploads/' })

dotenv.config()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

app.post('/upload', upload.single('file'), (req, res) => 
{
    const { title, description } = req.body
    const id = Date.now()

    const jsonData = {
        id, 
        title, 
        description,
        imageFile: req.file ? req.file.filename : null
    }

    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(jsonData, null, 2), (err) => 
    {
        if(err) {
            res.status(500).send('Failed to save the data')
        } else {
            res.status(200).send('Uploaded Successfully!')
        }
    })

})

app.listen(port, () => 
{
    console.log(`Server is running on http://localhost:${port}`);
})