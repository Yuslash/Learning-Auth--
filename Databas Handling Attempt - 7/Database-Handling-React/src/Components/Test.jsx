import { useCallback, useEffect, useState } from "react"

export default function Test()
{
    const [ userData, setUserData] = useState([])
    const [ username, setUsername] = useState("")

    const fetchUserData = useCallback(async (user) => {
        if (user) {
            const response = await fetch(`http://localhost:5403/data?username=${user}`)
            const data = await response.json()
            console.log(data)
            setUserData(data)
        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('username')
        setUsername(user)
        fetchUserData(user) 
    }, [fetchUserData])


    return <>
        {userData.length > 0 ? ( 
            userData.map(user => (
                <div key={user.id}>
                    <img src={user.imageFile} alt="/image" />
                    <h1>{user.title}</h1>
                    <h1>{user.description}</h1>
                </div>
            ))
        ) : (
            <p>No user data available.</p> 
        )}
    </>
}