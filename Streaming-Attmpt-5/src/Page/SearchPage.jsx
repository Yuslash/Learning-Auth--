import { useState } from "react"

export default function SearchPage({ userData })
{
    const [ searchTerm, setSearchTerm ] = useState("")

    const filteredData = userData.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
    )


    return <>
        <div className="flex flex-col items-center">
            <input
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-4 w-full rounded"
            />
            <div className="flex flex-wrap gap-5 justify-center mt-8">
                {filteredData.length > 0 ? (
                    filteredData.map(card => (
                        <div className="bg-purple-500 p-1 text-white rounded-lg" key={card.id}>
                            <img className="w-[400px] h-[200px] rounded-lg" src={card.imageFile} alt={card.title} />
                            <div className="flex flex-col px-2 gap-2 mt-2 py-4">
                                <h2 className="text-2xl font-bold">{card.title}</h2>
                                <p className="text-sm font-medium">{card.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No results found.</p>
                )}
            </div>
        </div>
    </>
}