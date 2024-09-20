import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectedPage()
{
    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('authToken')

        const expectedToken = "sibikrishnaistobusyrightnow"

        if(token && token === expectedToken) {
            setIsAuthenticated(true)
        } else {

            navigate('/Signup')

        }

    },[navigate])

    return isAuthenticated ?  (
        <h1>this is Protected - Page</h1>
    ) : null
}