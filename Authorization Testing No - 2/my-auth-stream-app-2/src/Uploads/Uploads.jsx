import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Uploads() 
{
    const [isAuthenticated , setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => 
    {
        const token = localStorage.getItem('authToken')
        
        const Execptedtoken = import.meta.env.VITE_API_TOKEN

        if(token && token === Execptedtoken) {

            setIsAuthenticated(true)
            
        } else {
            navigate('/signup')
        }

    })
    
    return (  
        <>
        {isAuthenticated ? (
                <h1>Welcome to Username Upload-Page</h1>
        ) : null}
        </>
    )
}