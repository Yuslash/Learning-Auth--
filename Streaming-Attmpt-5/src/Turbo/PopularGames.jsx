import { Link } from "react-router-dom"

export default function PopularGames( { games })
{
    return <>
        <h2>Popular Games</h2>
        <div className=" flex w-full h-[200px] p-2 gap-2 bg-cyan-300">
        {games.map((game) => (
            <Link to={`/card/${game.id}`} key={game.id}>
                <div className=" bg-amber-300 w-full p-2 h-full">
                    <h1>{game.title}</h1>
                    <p>{game.description}</p>
                </div>
            </Link>
        ))}
        </div>
    </>
}