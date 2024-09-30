import { useState } from "react";
import { Link } from "react-router-dom";

export default function TopStreamer({ games, hstreamer, nstreamer, topclip })
{
    const [ activateCategory, setActiveCategory ] = useState("top")


    const getItems = () =>
    {
        switch (activateCategory) {
            case 'top':
                return games
            case 'hot':
                return hstreamer
            case 'new':
                return nstreamer
            case 'clip':
                return topclip
            default:
                return games
        }
    }

    const activeItems = getItems()

    return <>
        <div className=" flex gap-2">
            
            <button 
                className={`underline ${activateCategory === 'top' ? 'font-semibold' : ''}`}
                onClick={() => setActiveCategory('top')}
            >
            Top Streamers
            </button>

            <button 
                className={`underline ${activateCategory === 'hot' ? 'font-semibold' : ''}`}
                onClick={() => setActiveCategory('hot')}
            >
            Hot streamer         
            </button>

            <button
                className={`underline ${activateCategory === 'new' ? 'font-semibold' : ''}`}
                onClick={() => setActiveCategory('new')}
            >
            New Streamer
            </button>

            <button 
                className={`underline ${activateCategory === 'clip'? 'font-semibold': ''}`}
                onClick={() => setActiveCategory('clip')}
            >
            Top clip
            </button>

        </div>
        <div className=" flex w-full h-[200px] p-2 gap-2 bg-purple-300">
            {activeItems.map((game) => (
                <Link to={`/main/${game.id}`} key={game.id}>
                    <div className=" bg-violet-800 w-full p-2 h-full">
                        <h1>{game.title}</h1>
                        <p>{game.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </>
}