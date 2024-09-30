import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import PopularGames from "./PopularGames"
import TopStreamer from "./TopStreamer"

export default function MainStream()
{
    const [ isAuthenticated, setIsAuthenticated] = useState(false)
    const [ username, setUsername] = useState("")
    const [ userData, setUserData] = useState([])
    const navigate = useNavigate()

    const fetchUserData = useCallback( async (user) =>
    {
        if(user){
            try {
                const response = await fetch(`http://localhost:5173/src/Server/mainstream.json`)
                const data = await response.json()
                setUserData(data)
            } catch(error) {
                console.error('Failed to fetch', error)
            }
        }
    })

    useEffect(() =>
    {
        const user = localStorage.getItem('username')
        setUsername(user)
        fetchUserData(user)

        const token = localStorage.getItem('authToken')
        const expectedToken = import.meta.env.VITE_API_TOKEN

        if(token && token === expectedToken ){
            setIsAuthenticated(true)
        } else {
            navigate('/signup')
        }

    }, [fetchUserData, navigate])

    const popularGames = userData.filter((items) => items.category === "Popular games")
    const topStreamer = userData.filter(item => item.category === "Top streamer")
    const hotStreamer = userData.filter(item => item.category === "Hot streamer")
    const newStreamer = userData.filter(item => item.category === "New Streamer")
    const topClip = userData.filter(item => item.category === "Top clip")

    // console.log(userData);

    const handleSearchActive = () =>
    {
        navigate('/search')
    }
    return <>
        {isAuthenticated ? (
            
            <div className=" flex flex-col gap-5">
                <h1>welcome {username} to this mainstream</h1>
                <input className=" p-4 w-full rounded"
                    placeholder="Search"
                    type="text"
                    onFocus={handleSearchActive}
                />
                {/* from here the content should hide when click the search */}
                        <PopularGames games={popularGames} />
                        <div className=" flex flex-col gap-4">
                            <TopStreamer hstreamer={hotStreamer} nstreamer={newStreamer} games={topStreamer} topclip={topClip} />
                        </div>
            </div>
        ) : null }
    </>
}
