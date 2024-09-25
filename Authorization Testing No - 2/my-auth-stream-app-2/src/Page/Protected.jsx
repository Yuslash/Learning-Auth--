import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Protected()
{
    
    const [ isAuthenticated , setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('authToken')

        const expectedToken = import.meta.env.VITE_API_TOKEN
        
        if(token && token === expectedToken) {

            setIsAuthenticated(true)

        } else {
            navigate('/signup')
        }

    })

    return (
        <>
            { isAuthenticated ? (
                <h2 className=" text-4xl text-white">This is protected page</h2>

            ) : null }
        </>
    )
}