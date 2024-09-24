import express from 'express'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/', upload.single('file'), (req, res) => 
{
    res.send('Upload Successfully!')
})

app.listen(3000, () => 
{
    console.log('server is running on http://localhost:3000');
})