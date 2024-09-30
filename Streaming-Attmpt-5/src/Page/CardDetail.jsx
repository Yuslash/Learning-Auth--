import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState, useCallback } from "react"
import AnimationTest from "../Animations/AnimationTest"

export default function CardDetail() {
    const { id } = useParams()
    const [username, setUsername] = useState("")
    const [cardData, setCardData] = useState([])

    const [loading, setLoading] = useState(true)

    const card = cardData.find((c) => c.id === parseInt(id))

    const fetchUserData = useCallback(async (user) => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:5173/src/Server/mainstream.json`)
                const data = await response.json()
                setCardData(data)
            } catch (error) {
                console.error('failed to fetch', error)
            } finally {
                setLoading(false)
            }
        }
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('username')
        fetchUserData(user)
        setUsername(user)
        
    }, [fetchUserData])

    const navigate = useNavigate()

    const navi = () => {
        navigate('/main')
    }

    const deleteCard = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this card?")

        if (confirmDelete) {
            await fetch(`http://localhost:3000/card/${card.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            alert('This card is deleted')
            navi()
        }
    }
    
    const updateViews = async () => {
        if (card) {  // Ensure card exists before updating views
            const response = await fetch(`http://localhost:3000/updateViews/${card.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username })
            })

            if (response.ok) {
                const result = await response.json()
                console.log('Updated Document:', result.viewedDoc)
            } else {
                console.error('Error updating views:', response.statusText)
            }
        }
    }

    useEffect(() => {
        updateViews() // Call updateViews when the component mounts
    }, [card]) // Run when card changes

    if (loading) {
        return <AnimationTest />
    }

    if (card?.username !== username ) {
        navigate('/main')
        return null
    }


    return (
        <>
            <div className="flex justify-between">
                <h1>This is card details page</h1>
                <div className="flex gap-2">
                    <h1 className=" text-xl font-semibold text-white tracking-normal">User:</h1>
                    <p className=" text-xl font-semibold text-red-300 tracking-normal">{username}</p>
                </div>
            </div>
            <img className="w-[300px] h-auto" src={card?.imageFile} alt={card?.title || "No title"} />
            <h1>{card?.title}</h1>
            <p>{card?.description}</p>
            <div className="flex gap-2">
                <button onClick={navi} className="p-4 bg-amber-300 text-black rounded-full mt-5">Back To Home</button>
                <button onClick={deleteCard} className="p-4 bg-amber-300 text-black rounded-full mt-5">Delete this Card</button>
            </div>
        </>
    )
}
