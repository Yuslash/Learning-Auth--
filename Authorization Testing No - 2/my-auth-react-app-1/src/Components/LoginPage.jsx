import { useState } from "react"

export default function LoginPage()
{
    const [ username , setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleLogin = () => 
    {
        const userExist = Object.values(localStorage).some((storedUser) => {
            try {
                
                const user = JSON.parse(storedUser)

                console.log(user);

                return user.username === username && user.password === password

            } catch(error) {

                alert(`Error parsing to localStorage ${error}`)

            }
        })

        if(userExist) {

            alert(`Login Successfull for user ${username}`)

        } else {

            alert(`Invalid username and password`)

        }
    }

    return <div className="flex flex-col gap-2">

        <h1 className="font-semibold text-xl">This is Login Page</h1>

        <input
        className="p-4 text-black"
        type="text"
        placeholder="Enter Your Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
         />

         
        <input
        className="p-4 text-black"
        type="password"
        placeholder="Enter Your Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
         />

        <button onClick={handleLogin} className=" p-4 bg-amber-400 hover:bg-amber-500 font-semibold text-xl">Submit - Login Page</button>

        <a href="http://localhost:5173/Signup" className="p-4 bg-purple-500 text-white font-semibold">To SignUp</a>

    </div>
}