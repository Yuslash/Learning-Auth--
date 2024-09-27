import { useCallback, useEffect, useState } from "react";


export default function SecondTest()
{
    const [ username, setUsername] = useState('')
    const [ userData, setUserData ] = useState([])

    const fetchUserData = useCallback(async (user) =>
    {
        if(user) {
           try {
               const response = await fetch(`http://localhost:5173/${username}.json`)
               const data = await response.json()
               console.log(data);
           } catch (error) {
             console.error('error fetching data', error)
           }
        }
    })

    useEffect(() =>
    {
        const user = localStorage.getItem('username')
        setUsername(user)
        fetchUserData(user)

    },[fetchUserData])

    return <>
        <h1>second test</h1>
        {}
    </>
}