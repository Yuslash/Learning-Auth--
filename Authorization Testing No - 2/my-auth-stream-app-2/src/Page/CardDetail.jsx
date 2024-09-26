import { useNavigate, useParams } from "react-router-dom"
import cardData from '../Server/cards.json'

export default function CardDetail() {
    const { id } = useParams()

    const card = cardData.find((c) => c.id === parseInt(id))

    if (!card) {
        return <p>Card Not Found</p>
    }

    const navigate = useNavigate()

    const navi = () => {
        navigate('/list')
    }

    return <>
        <h1>this is card details page</h1>
        <img className=" w-[300px] h-auto " src={card.imageFile} alt={card.title} />
        <h1>{card.title}</h1>
        <p>{card.description}</p>
        <button onClick={navi} className="p-4 bg-amber-300 text-black rounded-full mt-5">Back To Home</button>
    </>
}