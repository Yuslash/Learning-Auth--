import ReactPlayer from "react-player"

export default function VideoPlayer({ userData })
{
    const selectedVideoUrl = userData[8]
    const url = selectedVideoUrl.videoUrl
    console.log(url);

    return <>
        <h1>This is VideoPlayer Page</h1>
        <ReactPlayer
            url={url}
            controls
            light 
        />
    </>
}