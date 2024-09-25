import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Protected()
{
    
    const [ isAuthenticated , setIsAuthenticated] = useState(false)
    const [ username, setUsername] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('authToken')

        const expectedToken = import.meta.env.VITE_API_TOKEN
        
        if(token && token === expectedToken) {

            setIsAuthenticated(true)
            const storedUsername = localStorage.getItem('username')
            setUsername(storedUsername)

        } else {
            navigate('/signup')
        }

    })

    return (
        <>
            { isAuthenticated ? (
                <h2 className=" text-4xl text-white">Welcome {username}</h2>
            ) : null }
        </>
    )
}