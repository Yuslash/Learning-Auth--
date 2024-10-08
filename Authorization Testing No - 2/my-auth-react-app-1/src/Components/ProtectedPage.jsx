import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ProtectedPage()
{
    const [ isAuthenticated, setIsAuthenticated] = useState(true)
    const [ username, setUsername ] = useState("")
    const navigate = useNavigate()

    useEffect(() => {

        const storedAuthToken = localStorage.getItem('authToken')

        if(storedAuthToken) {
            try {
                
                const parsedAuthToken = JSON.parse(storedAuthToken)

                const token = parsedAuthToken.token

                const expectedToken = import.meta.env.VITE_APP_TOKEN

                if(token && token === expectedToken) 
                {
                    setIsAuthenticated(true)

                } else {

                    navigate('/signup')

                }

            } catch (error) {

                console.log(`Invalid json in authToken ${error}`);

            }
        } else {
            alert('You Didnt Have Any Accound Please Sign-In or Log In If You Have Any Account')
            navigate('/signup')
        }

    },[navigate])


    useEffect(() => {

        let some = []

        Object.values(localStorage).some((storedUser) => {

            try {

                const isJson = storedUser.startsWith('{') && storedUser.endsWith('}')

                if(isJson) {

                    const user = JSON.parse(storedUser)

                    if (user && user.username) {

                        some.push(user.username)

                    }

                }

            } catch (error) {

                console.log(`Invalid Json ERROR${error}`)

            }

        })

        setUsername(some)

    }, [])
    

    return isAuthenticated ?  (
        <>
            <h1 className="font-bold text-3xl text-black">Welcome {username}</h1>
            <h1 className=" font-semibold text-2xl text-black">this is Protected - Page</h1>
        </>
    ) : null
}