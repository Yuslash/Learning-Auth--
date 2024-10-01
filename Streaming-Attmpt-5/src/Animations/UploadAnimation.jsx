import Lottie from 'lottie-react'
import gameAnimation from './upload.json'

export default function UploadAnimation({ uploadingProgress }) {
    return (
        <div className='bg-violet-500 absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
            <div className='w-full flex flex-col justify-center items-center'>
                <Lottie animationData={gameAnimation} loop={true} style={{ width: 300, height: 300 }} />
                <p className="text-white">
                    Uploading... {uploadingProgress}%
                </p>
                <div className='w-full bg-gray-300 rounded-full h-4 mt-4 overflow-hidden shadow-lg'>
                    <div
                        className='bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-300 ease-in-out'
                        style={{ width: `${uploadingProgress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}
