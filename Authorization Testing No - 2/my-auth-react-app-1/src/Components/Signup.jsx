import { useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Singup()
{
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()

    console.log(username,password);

    const addUser = () =>
    {

        const userExist = Object.values(localStorage).some((storedUser) => {
            const user = JSON.parse(storedUser)
            return user.username === username
        })

        if(!userExist) {
            localStorage.setItem('user', JSON.stringify({ username, password }))

            const token = "sibikrishnaistobusyrightnow"

            localStorage.setItem('authToken', token)

            navigate('/Protected')

            alert(`user added : ${username}`)
        } else {
            alert(`this passowrd : ${password} this username :${username} has it so you cannot SignUP`)
        }
    }

    return <div className=" flex gap-3 flex-col text-black">
        
        <h1 className=" text-white font-bold text-xl">Sign-up how are you</h1>

        <input
        className="p-4"
        type="text"
        placeholder="Enter your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />
        <input
        className="p-4"
        type="text"
        placeholder="Enter your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />

         <button onClick={addUser} className=" p-4 bg-fuchsia-500 text-white font-semibold text-xl">Submit - signUp</button>

        <a href="http://localhost:5173/Login" className="p-4 bg-lime-500 text-white font-semibold">To Login-Page</a>

    </div>
}