import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function Parameter() {
    const [userData, setUserData] = useState([])
    const [username, setUsername] = useState('')

    const { id } = useParams()

    const card = userData.find((c) => c.id === parseInt(id))

    const fetchUserData = useCallback(async (user) => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:5173/${user}.json`)
                const data = await response.json()
                setUserData(data)
            } catch (error) {
                console.error('failed to fetch', error)
            }
        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('username')
        setUsername(user)
        fetchUserData(user)
    }, [fetchUserData])

    return (
        <>
            <h1>Parameter Page</h1>
            {card ? (
                <>
                    <h2>{card.title}</h2>
                </>
            ) : (
                <p>No data found for the given ID</p>
            )}
        </>
    )
}
