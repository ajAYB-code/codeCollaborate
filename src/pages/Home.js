import { signOut } from "firebase/auth";

const Home = () => {

    const logOut = async () => {
        await signOut()
    }

    return (
        <>
        <h1>Welcome new user</h1>
        <button onClick={logOut}>Logout</button>
        </>
    )
}

export default Home;