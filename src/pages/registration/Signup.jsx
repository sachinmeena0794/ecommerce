import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true)
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required")
        }

        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(users.user));

            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time : Timestamp.now()
            }
            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user);
            toast.success("Signup Successfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            navigate('/');
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Signup failed. Please try again later.");
        }
    };

    // Function to handle Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // Handle successful sign-in with Google
            console.log("Google sign-in successful:", result);
            navigate('/');
        } catch (error) {
            console.error("Google sign-in failed:", error);
            toast.error("Google sign-in failed. Please try again later.");
        }
    };

    return (
        <Layout>
            <div className='flex justify-center items-center h-screen'>
                {loading && <Loader/>}
                <div className='bg-gray-800 px-10 py-16 rounded-xl w-full max-w-md' style={{ backgroundColor: '#908a81' }}>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black-200'
                            placeholder='Name'
                            style={{ backgroundColor: '#e2e0dc' }}
                        />
                    </div>

                    <div>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black-200'
                            placeholder='Email'
                            style={{ backgroundColor: '#e2e0dc' }}
                        />
                    </div>
                    <div>
                        <div className='relative'>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black-200'
                                placeholder='Password'
                                style={{ backgroundColor: '#e2e0dc' }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 px-4  text-black rounded-r-lg focus:outline-none flex items-center justify-center'
                                style={{marginBottom:'15px'}}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div className='flex justify-center mb-3'>
                        <button
                            onClick={signup}
                            className='bg-black w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={handleGoogleSignIn}
                            className='bg-red-600 w-full text-white font-bold px-2 py-2 rounded-lg'>
                            Signup with Google
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white text-lg'>Already have an account? <Link className='text-black font-bold px-1' 
                            style={{ transition: 'transform 0.3s ease-in-out', display: 'inline-block' }}
                            onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                            onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }} to={'/login'}>Login</Link></h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Signup;
