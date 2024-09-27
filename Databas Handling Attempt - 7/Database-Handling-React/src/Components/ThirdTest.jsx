import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function ThirdTest()
{
    const [ username, setUsername ] = useState("")
    const [ userData, setUserData] = useState([])

    const fetchUserData = useCallback(async (user) =>
    {
        if(user)
        {
            try {

                const response = await fetch(`http://localhost:5173/${user}.json`)
                const data = await response.json()
                setUserData(data)

            }catch (error) {
                console.error('failed to fetch', error)
            }
        }
    })

    useEffect(() =>
    {
        const user = localStorage.getItem('username')
        setUsername(user)
        fetchUserData(user)
    }, [fetchUserData])


    return <>
        <h1>THird Test page</h1>
        {userData.map(user =>
        (
            <Link to={`/para/${user.id}`} key={user.id} >
            <div>
                <h1>{user.title}</h1>
                <img src={user.imageFile} />
            </div>
            </Link>
        ))}
    </>
}