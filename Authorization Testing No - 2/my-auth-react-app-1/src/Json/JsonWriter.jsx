import { useState } from "react"

export default function JsonWriter() {
    const [imageFile, setImageFile] = useState(null)
    const [ previewImage, setPreviewImage] = useState(null)
    const [videoFile, setVideoFile] = useState(null)
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

                const contentType = response.headers.get("content-type")
                let data

                if (contentType && contentType.includes("application/json")) {
                    data = await response.json()
                } else {
                    data = await response.text() // Fallback for plain text responses
                }
                
                console.log('Data saved successfully')
                setTitle("")
                setDescription("")
                setImageFile(null)
                setPreviewImage(`http://localhost:3000/public/${data.imageFile}`)
            } else {
                console.error('Failed to save data:', response.statusText)
            }
        } catch (error) {
            console.error('Error during submission:', error)
        }
    }

    return (
        <div className="flex gap-2">
        <div className="flex flex-col gap-4 w-full">
            <h1>This is the JSON Writer page</h1>
            <div className=" flex gap-2">
            <input
                type="file"
                accept="image/*"
                className="p-2 bg-amber-500 rounded w-full"
                onChange={(e) => {
                    const file = e.target.files[0]
                    setImageFile(file)
                    setPreviewImage(URL.createObjectURL(file))
                }}
                required
            />
            <input
                type="file"
                accept="video/*"
                className="p-2 bg-violet-500 rounded w-full"
                onChange={(e) => setVideoFile(e.target.files[0])}
                required
            />
            </div>

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
                className="p-4 bg-violet-600 rounded font-medium text-xl text-black"
            >
                Submit
            </button>
        </div>
            <div className="flex flex-col w-full gap-4">
                <h1>Preview Page</h1>

                {imageFile ? (
                    <div className=" w-full h-[300px] rounded overflow-hidden ">
                        <img
                            src={previewImage}
                            className=" w-full h-full object-cover"
                        />
                    </div>
                ) : <div className=" flex w-full h-[300px] rounded p-4 bg-slate-400">THUMBNAIL</div>}

                <p className=" text-2xl font-bold">{title}</p>
                <p className=" text-md">{description}</p>
            </div>
        </div>
    )
}
