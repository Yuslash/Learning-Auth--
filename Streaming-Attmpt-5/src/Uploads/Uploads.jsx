import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AnimationTest from "../Animations/AnimationTest"

export default function Uploads({ userData }) 
{   
    const [ username, setUsername ] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription ] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const [ loading, setLoading] = useState(true)
    const [ selectedCategory, setSelectedCategory] = useState("")
    const navigate = useNavigate()

    

    useEffect(() =>
    {
        const timer = setTimeout(() => {
            setLoading(false)

        }, 2000)

        return () => clearTimeout(timer)

    }, [])

   
    
    useEffect(() => 
    {

        const token = localStorage.getItem('authToken')
        const user = localStorage.getItem('username')
        const Execptedtoken = import.meta.env.VITE_API_TOKEN

        setUsername(user)

        if(token && token === Execptedtoken) {

            setIsAuthenticated(true)
            
        } else {
            navigate('/signup')
        }

    },[navigate])

    if (loading) {
        return <AnimationTest />
    }

    const addUser = async () =>
    {
        if(!title || !description || !imageFile )
        {
            alert('All Fields are Required! and select and image ')
            return   
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('imageFile', imageFile)
        formData.append('username', username)
        formData.append('games', selectedCategory)

        try {

           const response =  await fetch('http://localhost:3000/upload',{
                method: 'POST',
                body: formData
            })

            if(response.ok) {
                alert('Upload Successfully')

                setTitle("")
                setDescription("")
                setImageFile("")
                setSelectedCategory("")
            }


        } catch (error) {
            console.error('Error uploading', error);
            alert('Upload failed. Please try again')
        }

    }

    const uniqueCategories = [...new Set(userData.map(item => item.games))]
    
    return (  
        <>
        {isAuthenticated ? (
                <div className=" flex flex-col gap-4">
                    <h1 className=" text-2xl font-semibold text-white">Welcome {username} this is Upload-Page</h1>
                    
                    <input 
                    type="file" 
                    accept="image/*"
                    className=" bg-cyan-400 p-2 rounded" 
                    onChange={(e) => setImageFile(e.target.files[0])} 
                    />

                    <input 
                    className=" p-4 text-black rounded"
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                    <input
                    className=" p-4 text-black rounded"
                    type="text"
                    placeholder="Enter Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />

                    {/* categories mapping */}
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

                    <button onClick={addUser} className=" bg-amber-400 p-4 rounded">Upload</button>

                </div>
        ) : null}

        
        </>
    )
}