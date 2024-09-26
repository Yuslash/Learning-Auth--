import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Uploads() 
{
    const [ username, setUsername ] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription ] = useState("")
    const [imageFile, setImageFile] = useState(null)
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

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

    const addUser = async () =>
    {
        if(!title || !description || !imageFile)
        {
            alert('All Fields are Required! and select and image ')
            return   
        }

        const formData = new FormData()
        formData.append('title', title)
        formData.append('description', description)
        formData.append('imageFile', imageFile)

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
            }


        } catch (error) {
            console.error('Error uploading', error);
            alert('Upload failed. Please try again')
        }

    }
    
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

                    <button onClick={addUser} className=" bg-amber-400 p-4 rounded">Upload</button>

                </div>
        ) : null}
        </>
    )
}