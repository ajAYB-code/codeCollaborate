import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('SUCCESS SIGNIN');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleLogin}>Login</button>
            <Link to="/signup">SignUp</Link>
        </div>
    )
}

export default Login;