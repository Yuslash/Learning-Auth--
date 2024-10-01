import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UploadAnimation from "../Animations/UploadAnimation"
import AnimationTest from "../Animations/AnimationTest"

export default function Uploads({ userData }) {
    const [username, setUsername] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)
    const [uploadingVideo, setUploadingVideo] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [uploadingProgress, setUploadingProgress] = useState(0)
    const [ videoUrl, setVideoUrl] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        const token = localStorage.getItem("authToken")
        const user = localStorage.getItem("username")
        const expectedToken = import.meta.env.VITE_API_TOKEN

        setUsername(user)

        if (token && token === expectedToken) {
            setIsAuthenticated(true)
        } else {
            navigate("/signup")
        }
    }, [navigate])

    if (loading) {
        return <AnimationTest /> // You can replace this with any loading indicator you prefer.
    }

    const addUser = async () => {
        if (!title || !description || !imageFile || !videoUrl) {
            alert("All Fields are Required! and select an image")
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("imageFile", imageFile)
        formData.append("videoUrl", videoUrl)
        formData.append("username", username)
        formData.append("games", selectedCategory)

        try {
            const response = await fetch("http://localhost:3000/upload", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                alert("Upload Successfully")
                setTitle("")
                setDescription("")
                setImageFile(null)
                setSelectedCategory("")
            }
        } catch (error) {
            console.error("Error uploading", error)
            alert("Upload failed. Please try again")
        }
    }

    const uniqueCategories = [...new Set(userData.map((item) => item.games))]

    const handleVideoUrl = async (event) => {
        const video = event.target.files[0]
        const formData = new FormData()
        formData.append("file", video)
        formData.append("upload_preset", "Just_Got_Here")
        formData.append("cloud_name", "dpxm4k7v5")

        setUploadingVideo(true)

        // XMLHttpRequest to track progress
        const xhr = new XMLHttpRequest()
        xhr.open("POST", "https://api.cloudinary.com/v1_1/dpxm4k7v5/video/upload")

        // Track the upload progress
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentageComplete = Math.round((event.loaded * 100) / event.total)
                console.log("Upload Progress:", percentageComplete) // Debugging the progress
                setUploadingProgress(percentageComplete) // Update state with progress
            }
        }

        // Handle response after upload
        xhr.onload = () => {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText)
                console.log("Uploaded Video URL:", response.url)
                setVideoUrl(response.url)
                setUploadingVideo(false)
                setUploadingProgress(0) // Reset progress after upload
            } else {
                console.error("Upload Failed")
                setUploadingVideo(false)
                setUploadingProgress(0) // Reset progress if upload fails
            }
        }

        xhr.send(formData)
    }

    return (
        <>
            {isAuthenticated ? (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold text-white">
                        Welcome {username}, this is the Upload Page
                    </h1>
                    {uploadingVideo ? (
                        <UploadAnimation uploadingProgress={uploadingProgress} />
                    ) : (
                        <>
                            <div className="w-full flex gap-2">
                                <input
                                    type="file"
                                    accept="video/*"
                                    className="bg-orange-400 p-2 w-full rounded"
                                    onChange={handleVideoUrl}
                                />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="bg-cyan-400 p-2 w-full rounded"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                />
                            </div>

                            <input
                                className="p-4 text-black rounded"
                                type="text"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />

                            <input
                                className="p-4 text-black rounded"
                                type="text"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />

                            {/* Categories Mapping */}
                            <select
                                className="p-4 text-black rounded"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select Game</option>
                                {uniqueCategories.map((game, index) => (
                                    <option key={index} value={game}>
                                        {game}
                                    </option>
                                ))}
                            </select>

                            <button onClick={addUser} className="bg-amber-400 p-4 rounded">
                                Upload
                            </button>
                        </>
                    )}
                </div>
            ) : null}
        </>
    )
}
