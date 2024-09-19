import { useState } from "react"

export default function Singup()
{
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    console.log(username,password);

    const addUser = () =>
    {
        const userCount = localStorage.length
        const nextIndex = userCount + 1

        localStorage.setItem(`user${nextIndex}`, JSON.stringify({ username, password }))
    }

    return <div className=" flex gap-3 flex-col text-black">
        
        <h1 className=" text-white font-bold text-xl">Sign-up how are you</h1>

        <input
        className="p-4"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />
        <input
        className="p-4"
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />

         <button onClick={addUser} className=" p-4 bg-fuchsia-500 text-white font-semibold text-xl">Submit - signUp</button>
    </div>
}