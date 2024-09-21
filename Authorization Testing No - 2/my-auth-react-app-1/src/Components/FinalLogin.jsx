import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function FinalLogin()
{
    const [ username, setUsername ] = useState('')
    const [ password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = () =>
    {
         const userExist = Object.values(localStorage).some((storedUser) => {
            try {

                const user = JSON.parse(storedUser)

                return user.username === username && user.password === password

            } catch(error) {

                alert(`Error parsing to localStorage ${error}`)

            }

        })

        if (userExist) {

            const token = import.meta.env.VITE_APP_TOKEN

            localStorage.setItem('authToken', token)

            alert(`Success! you have been login ${username}`)

            navigate('/Protected')

        } else {
            alert(`Invalid Username and password`)
        }

    }

    return <div className="flex flex-col gap-2">

        <h1>Final-Login Page</h1>

        <input
        className="p-4 text-black"
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />

        <input
        className="p-4 text-black"
        type="password"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
         />

         <button onClick={handleLogin} className=" p-4 bg-lime-300 text-black font-semibold text-lg">Submit - FinalLogin</button>

    </div>
}