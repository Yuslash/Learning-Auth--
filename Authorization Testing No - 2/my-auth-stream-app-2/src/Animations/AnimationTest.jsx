import Lottie from 'lottie-react'
import animationData from './Animation - 1727329069893.json'
import gameAnimation from './game.json'

export default function AnimationTest()
{

    return (
        <>
        <div className=' bg-cyan-300 absolute top-0 left-0 w-full h-full flex justify-center items-center'>
        <div className='w-full flex flex-col justify-center items-center'>
            <Lottie animationData={gameAnimation} loop={true} style={{width : 300, height: 300}} />
            <h1 className=' text-2xl font-semibold'>Loading....</h1>
        </div>
            </div>
        </>
    )

}