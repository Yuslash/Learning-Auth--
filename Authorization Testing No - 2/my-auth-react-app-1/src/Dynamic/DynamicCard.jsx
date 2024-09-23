export default function DynamicCard() 
{
    return <div className="flex flex-col gap-4">
        <h1>Dynamic Card Page Here!</h1>
        {/* Card Style Start */}

        <div className="flex">
            <div className="p-1 flex w-[300px] flex-col bg-purple-700 rounded-lg">
                <img className="rounded-lg h-[160px]" src="/wallpaper.png"></img>
                <div className=" p-2 flex flex-col gap-2 bg-purple-700 rounded-lg">
                    <p className=" text-md font-semibold">There is Nothing</p>
                    <p className=" text-sm">Multer is a node.js middleware hand multipart form-data</p>
                    <div className="flex gap-2 mt-1">
                        <p className="tags inline-block max-w-fitt px-2 h-auto rounded-full py-1 bg-blue-500 justify-center">#Tags</p>
                        <p className="tags inline-block max-w-fitt px-2 h-auto rounded-full py-1 bg-blue-500 justify-center">#Tags</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Card Style End */}
    
    </div>
}