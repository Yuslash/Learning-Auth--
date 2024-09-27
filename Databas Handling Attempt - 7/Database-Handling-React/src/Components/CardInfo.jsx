import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function CardInfo()
{
    const { username } = useParams()
    const [ userData, setUserData] = useState([])
    
    useEffect(() =>
   { 
        const fetchUser = async() =>
        {
            const response = await fetch(`http://localhost:5403/data?username=${username}`)
            const data = await response.json()
            setUserData(data)
        }

        fetchUser()

    },[username])

    console.log(userData);

    return <>
        <h1>this is cardInfo page</h1>
        {userData.map(user => (
            <div key={user.id}>
                <img src={user.imageFile} alt="/image" />
                <h1>{user.title}</h1>
                <h1>{user.description}</h1>
            </div>
        ))}
    </>
}