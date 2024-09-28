import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login()
{

    const [ username , setUsername ] = useState("")
    const [ password, setPassword ] = useState("")

    const navigate = useNavigate()

    const handleLogin = async () => 
    {
        const response = await fetch('http://localhost:3000/login', {
            method : 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })

        const data = await response.json()

        if(response.ok) {

            alert('Login Successful!')

            navigate('/main')

            const token = import.meta.env.VITE_API_TOKEN

            localStorage.setItem('authToken', token)
            localStorage.setItem('username', data.username)
        
        } else {
            alert(data.message)
        }
    }

    return (
        <div className=" flex flex-col gap-4">
        
        <h1 className=" text-white text-2xl font-semibold">Welcome To Login page</h1>
            
            <input
            className=" p-4 rounded"
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className=" p-4 rounded"
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={handleLogin} className=" bg-amber-300 p-4 rounded">Submit - Login</button>

            <Link className=" font-semibold" to={'/signup'} >If you dont have an account - <span className=" text-white">Signup</span></Link> 
        </div>
    )
}