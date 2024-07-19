import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {

        try {
            console.log(email)
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('SUCCESS SIGNUP');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
            <button onClick={handleSignup}>Signup</button>
            <Link to="/">Login</Link>
        </div>
    )
}

export default Signup;