import { useState } from "react"

export default function Singup()
{
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    console.log(username,password);

    const addUser = () =>
    {
        
    }

    return <div className=" flex gap-3 flex-col text-black">
        
        <h1 className=" text-white font-bold text-xl">Sign-up how are you</h1>

        <input
        className="p-4"
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />
        <input
        className="p-4"
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />

         <button className=" p-4 bg-fuchsia-500 text-white font-semibold text-xl">Submit - signUp</button>
    </div>
}