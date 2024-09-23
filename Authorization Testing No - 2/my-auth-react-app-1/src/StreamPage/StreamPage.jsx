export default function StreamPage()
{

    const thumnail = localStorage.getItem('imageFileUrl')

    const title = localStorage.getItem('videoTitle')

    const description = localStorage.getItem('description')

    console.log(thumnail);

    return <div className="flex flex-col gap-4">
        
        <h1>This is StreamPage</h1>
        
        <div className="w-full h-[600px] bg-slate-500 rounded">
            <img 
            src={thumnail}
            className=" w-full h-full object-cover rounded"
            />
        </div>
            <p className="text-2xl font-semibold">{title}</p>
            <p className="text-xl">{description}</p>
    </div>
}