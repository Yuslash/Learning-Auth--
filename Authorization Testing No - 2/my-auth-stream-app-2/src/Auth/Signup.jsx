import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function Signup()
{

    const [ username, setUsername] = useState("")
    const [ password , setPassword] = useState("")

    const navigate = useNavigate()

    const addUser = async () => {

        const response = await fetch('http://localhost:3000/auth', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })

        if(response.ok) {
            
            const data = await response.json()

            setUsername("")
            setPassword("")

            alert('User is added', data)

            navigate('/protected')
            
            const token = import.meta.env.VITE_API_TOKEN

            localStorage.setItem('authToken', token)

        } else {
            alert('UserName is Already Exist!', response.statusText)
        }

    }

    return (
        <div className=" flex flex-col gap-4">
            <h1 className="text-white text-2xl font-semibold">Welcome to Signup-Page</h1>
            
            <input 
             className=" p-4 rounded text-black"
             type="text"
             placeholder="Enter your Username"
             value={username}
             onChange={(e) => setUsername(e.target.value)}   
            />

            <input
            className=" p-4 rounded text-black"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={addUser} className=" p-4 text-black rounded bg-lime-300">Submit-Signup</button>

            <Link to={'/login'} className=" text-start font-semibold">If you already have an account - <span className=" text-white">Login</span></Link>
        
        </div>
    )
}