import { useState } from "react"

export default function JsonWriter() {
    const [imageFile, setImageFile] = useState(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async () => {
        if (!imageFile || !title || !description) {
            alert("All fields are required")
            return
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('imageFile', imageFile)

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                body: formData
            })

            if (response.ok) {
                console.log('Data saved successfully')
                setTitle("")
                setDescription("")
                setImageFile(null)
            } else {
                console.error('Failed to save data:', response.statusText)
            }
        } catch (error) {
            console.error('Error during submission:', error)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <h1>This is the JSON Writer page</h1>

            <input
                type="file"
                accept="image/*"
                className="p-2 bg-amber-500 rounded"
                onChange={(e) => setImageFile(e.target.files[0])}
                required
            />

            <input
                type="text"
                className="p-4 text-black rounded"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <textarea
                className="p-4 text-black rounded h-[300px]"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <button
                onClick={handleSubmit}
                className="p-4 bg-violet-600 rounded font-medium text-2xl"
            >
                Submit
            </button>
        </div>
    )
}
