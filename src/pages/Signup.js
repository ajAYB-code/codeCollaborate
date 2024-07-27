import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import codecollab_logo from "../assets/images/codecollab_logo.png";
import home_bg from "../assets/images/home_bg.jpg";
import Button from "../components/Button";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../config/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const hasPageBeenLoaded = useRef(false);

  const isValidUsername = (username) => {
    if (username.length < 5) return false;

    //Username shouldn't have just numbers
    const regex = /^(?!\d+$)/;
    if (!regex.test(username)) return false;

    return true;
  };

  const usernameExists = async (username) => {
    // Check for uniqueness
    const usersInfoRef = collection(db, "usersInfo");
    const q = query(usersInfoRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSignup = async () => {
    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setUsernameError(usernameError);

    try {
      if (!isValidUsername(username) || (await usernameExists(username))) {
        throw Error("username-not-valid");
      }
      // Create user
      await createUserWithEmailAndPassword(auth, email, password);

      // Save username
      const docRef = await addDoc(collection(db, "usersInfo"), {
        userId: auth.currentUser.uid,
        username: username,
      });

      // Redirect new created user to home page
      navigate("/home");
    } catch (error) {
      console.log(error);
      if (error.message) {
        switch (error.message) {
          case "username-not-valid":
            setUsernameError("Invalid username (username should have at least 5 characters and shouldn't be all numbers)");
            break;
        }
      } else {
        switch (error.code) {
          case "auth/invalid-email":
            setEmailError("Invalid email address");
            break;
          case "auth/email-already-in-use":
            setEmailError("Email is already in use");
            break;
          case "auth/missing-password":
            setPasswordError("Password is required");
            break;
          case "auth/weak-password":
            setPasswordError("Password is too weak");
            break;
          default:
            setGeneralError("Failed to sign up. Please try again.");
        }
      }
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      setUsernameError("");
      if ((await usernameExists(username))) {
        setUsernameError("Username is not available");
      }
    };

    // Avoid username input error appears on component first load
    if (hasPageBeenLoaded.current) {
      checkUsername();
    }

    hasPageBeenLoaded.current = true;
  }, [username]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${home_bg})` }}
    >
      <div className="bg-white/5 backdrop-blur-md shadow-lg rounded-lg ring-2 ring-white/10 p-8 my-6 w-4/5 max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src={codecollab_logo}
              alt="Company Logo"
              className="mx-auto max-w-44 object-contain"
            />
          </Link>
          <h1 className="text-2xl text-white font-bold mt-10">
            Create your account
          </h1>
        </div>
        <form>
          {generalError && <p className="text-red-500 mb-2">{generalError}</p>}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 rounded bg-gray-100 bg-opacity-90 focus:bg-opacity-100 focus:outline-none"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            {usernameError && (
              <p className="text-red-500 mt-1">{usernameError}</p>
            )}
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded bg-gray-100 bg-opacity-90 focus:bg-opacity-100 focus:outline-none"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded bg-gray-100 bg-opacity-90 focus:bg-opacity-100 focus:outline-none"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {passwordError && (
              <p className="text-red-500 mt-1">{passwordError}</p>
            )}
          </div>
          <div className="flex justify-between items-center mb-4">
            <Button type="primary" onClick={handleSignup}>
              Create
            </Button>
          </div>
          <div className="text-center mt-8 mb-4 text-white">
            <p>Or continue with</p>
          </div>
          <div className="flex justify-center mb-4 space-x-4">
            <Button className="inline-flex items-center bg-red-500 text-white hover:bg-red-600">
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Google
            </Button>

            <Button className="inline-flex items-center bg-gray-900 hover:bg-gray-700">
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd"
                />
              </svg>
              Github
            </Button>
          </div>
          <div className="text-center">
            <p className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Connect
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
