import { useEffect, useState } from "react"

export default function Profile()
{
    const [ username, setUsername ] = useState("")

    useEffect(() => {

        let name = []

        Object.values(localStorage).some((storedValues) => 
        {
            const user = JSON.parse(storedValues)

            if(user && user.username) 
            {
                name.push(user.username)
            }
        })

        setUsername(name)

    },[])

    return <div className="text-black">

        <h1 className="  text-4xl font-bold text-center">This Is Your Profile page</h1>
        <h1 className="  text-3xl font-semibold text-center">Your Name : {username}</h1>

    </div>
}