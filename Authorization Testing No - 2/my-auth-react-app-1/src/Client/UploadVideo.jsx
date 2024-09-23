import { useState } from "react"

export default function UploadVideo()
{
    const [ videoFile, setVideoFile ] = useState(null)
    const [ imageFile, setImageFile] = useState(null)
    const [ videoTitle, setVideoTitle] = useState("")
    const [ descritption, setDescription] = useState("")


    const addForm = () => {

        if(!videoFile || !imageFile)
        {
            alert('Please Upload Both Image and Videofile')
            return
        }

        localStorage.setItem('videoTitle', videoTitle)

        localStorage.setItem('description', descritption)

        localStorage.setItem('videoFileName', videoFile.name)

        localStorage.setItem('imageFileName', imageFile.name)

        localStorage.setItem("imageFileUrl", URL.createObjectURL(imageFile))
    
    }

    return <div className="flex gap-5"> 
    
    <div className="flex w-full flex-col gap-4">

        <h1>Here you can Upload an video</h1>

        <div className="flex gap-3">
        <input
        type="file"
        accept="video/*"
        className="text-black rounded w-full bg-amber-200 flex justify-center"
        onChange={(e) => setVideoFile(e.target.files[0])}
        />

        <input 
        type="file"
        accept="image/*"
        className=" bg-purple-400 w-full"
        onChange={(e) => setImageFile(e.target.files[0])}   
        />
        </div>

        <input
        className=" p-4 text-black rounded"
        placeholder="Enter your Title for the Video"
        type="text"
        value={videoTitle}
        onChange={(e) => setVideoTitle(e.target.value)}
         />
        <textarea
        className=" p-4 text-black rounded h-52"
        placeholder="Enter Descritption"
        value={descritption}
        onChange={(e) => setDescription(e.target.value)}
        ></textarea>

            <button onClick={addForm} className="p-4 bg-yellow-300 rounded font-bold text-md text-black">UPLOAD</button>
    </div>

    <div className="flex flex-col w-full gap-4">
        <h1>Preview Page</h1>

        {imageFile ? (
            <div className=" w-full h-[300px] rounded overflow-hidden ">
                <img
                src={URL.createObjectURL(imageFile)}
                className=" w-full h-full object-cover"
                />
            </div>
        ): <div className=" flex w-full h-[300px] rounded p-4 bg-slate-400">THUMBNAIL</div>}

        <p className=" text-2xl font-bold">{videoTitle}</p>
        <p className=" text-md">{descritption}</p>
    </div>

</div>
}
