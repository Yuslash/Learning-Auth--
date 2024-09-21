export default function EnvTest() {

    console.log(import.meta.env.VITE_APP_TOKEN);

    return <>
        <h1>welcome to env test page</h1>
    </>
}