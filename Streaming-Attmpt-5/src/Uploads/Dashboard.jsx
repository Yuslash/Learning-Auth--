import { useState, useEffect, useCallback } from "react"
import Uploads from "./Uploads"

export default function Dashboard()
{
    const [ userData, setUserData] = useState([]) 

    const fetchUserData = useCallback(async (user) => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:5173/src/Server/sample.json`)
                const data = await response.json()
                setUserData(data)
            } catch (error) {
                console.error('Failed to fetch', error)
            }
        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('username')
        fetchUserData(user)
    }, [fetchUserData])


    return (
        <>
            <Uploads userData={userData} />
        </>
    )
}