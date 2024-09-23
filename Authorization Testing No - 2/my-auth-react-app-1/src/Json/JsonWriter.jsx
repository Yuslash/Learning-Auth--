import { useState } from "react"

export default function JsonWriter() 
{

    const [ imageFile, setImageFile ] = useState(null)
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")

    const handleSumbit = async() => 
    {
        if(!imageFile || !title || !description){
            alert("All Fields are required")
            return
        }

        const id = Date.now()

        const formData = new FormData()

        formData.append('id',id)
        formData.append('title',title)
        formData.append('description', description)
        formData.append('imageFile', imageFile)

        const response = await fetch('http://localhost:5000/data', 
            {
                method : 'POST',
                body: formData
            }
        )

        if(response.ok) {

            console.log('Data saved Successfully');
            setTitle("")
            setDescription("")
            setImageFile(null)            
        } else {
            console.log('failed to save data');
        }

    }

    return <div className="flex flex-col gap-4">

        <h1>This is json writer page</h1>
        
        <input 
        type="file"
        accept="image/*"
        className="p-2 bg-amber-500 rounded"
        onChange={(e) => setImageFile(e.target.files[0])}
        required
        />

        <input 
        type="text"
        className=" p-4 text-black rounded"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
        />

        <textarea 
        type="text"
        className=" p-4 text-black rounded h-[300px]"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        />

        <button onClick={handleSumbit} className="p-4 bg-violet-600 rounded font-medium text-2xl">Submit</button>

    </div>
}