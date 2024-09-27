import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SetUsername()
{
    const [username, setUsername] = useState('')

    useEffect(() =>
    {
        const user = localStorage.getItem('username')
        setUsername(user)

    },[])  

    return <>
        <Link to={`/data/:${username}`}>
            <div>set Username</div>
        </Link>
    </>
}