import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SearchPage({ userData })
{
    const [ searchTerm, setSearchTerm ] = useState("")

    const filteredData = userData.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.username.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const navigate = useNavigate()

    const handleNaviClick = () =>
    {
        navigate('/main')
    }

    return <>
        <div className="flex flex-col items-center gap-2">
        <div className=" w-full gap-2 flex flex-col items-end">
            <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-4 w-full rounded"
            />
            <button onClick={handleNaviClick} className=" p-4 bg-amber-200 rounded">Go Back</button>
            </div>
            <div className="flex flex-wrap gap-5 justify-center mt-8">
                {filteredData.length > 0 ? (
                    filteredData.map(card => (
                        <Link to={`/main/${card.id}`} key={card.id}>
                        <div className="bg-purple-500 p-1 text-white rounded-lg" >
                            <img className="w-[400px] h-[200px] rounded-lg" src={card.imageFile} alt={card.title} />
                            <div className="flex flex-col px-2 gap-2 mt-2 py-4">
                                <h2 className="text-2xl font-bold">{card.title}</h2>
                                <p className="text-sm font-medium">{card.description}</p>
                            </div>
                        </div>
                        </Link>
                    ))
                ) : (
                    <p className="text-white">No results found.</p>
                )}
            </div>
        </div>
    </>
}