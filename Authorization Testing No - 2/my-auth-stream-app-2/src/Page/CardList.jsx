import { Link } from "react-router-dom"
import CardData from '../Server/cards.json'
import { useEffect, useState } from "react"

export default function CardList() {

    const [ username, setUsername ] = useState("")

    useEffect(() => 
    {

        const user = localStorage.getItem('username')

        setUsername(user)

    },[])

    return <div className=" flex flex-col px-[40px] sm:px-[0px]">
    <div className=" flex justify-between font-semibold text-xl">
            <h1 className="text-4xl font-semibold text-yellow-400">this is card list page</h1>
            <div className="flex">
                <p className=" text-white">User:  <span className=" text-red-300">{username}</span></p>
            </div>
    </div>
        <div className=" flex flex-wrap gap-5 justify-center mt-8">
            {CardData.map((card) => (
                <div className="bg-purple-500 p-1 rounded-lg " key={card.id}>
                    <Link to={`/card/${card.id}`}>
                        <img className="w-[400px] h-[200px] rounded-lg" src={card.imageFile} />
                        <div className=" flex flex-col px-2 gap-2 mt-2 py-4">
                            <h2 className="text-2xl font-bold">{card.title}</h2>
                            <p className="text-sm font-medium">{card.description}</p>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    </div>
}