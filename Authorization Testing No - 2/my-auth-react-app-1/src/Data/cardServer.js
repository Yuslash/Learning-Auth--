import express from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        cb(null, `/${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

dotenv.config()
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

const filePath = path.join(__dirname, 'cards.json')

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]))
}

app.post('/upload', upload.single('imageFile'), (req, res) => {
    const { title, description } = req.body
    const id = Date.now()

    const jsonData = {
        id,
        title,
        description,
        imageFile: req.file ? req.file.filename : null
    }

    let existingData = []

    const fileData = fs.readFileSync(filePath, 'utf8')

    try {
        existingData = JSON.parse(fileData)

        if (!Array.isArray(existingData)) {
            existingData = []
        }
    } catch (error) {

        console.log('Error parsing error', error);
        existingData = []

    }

    existingData.push(jsonData)

    fs.writeFile(path.join(__dirname, 'cards.json'), JSON.stringify(existingData, null, 2), (err) => {
        if (err) {
            res.status(500).send('Failed to save the data')
        } else {
            res.status(200).send('Uploaded Successfully!')
        }
    })

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})