import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myContext from '../../context/data/myContext';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { sendPasswordResetEmail, signInWithEmailAndPassword ,getAuth } from 'firebase/auth'; // Correct import statement


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate();

    const login = async () => {
        try {
          const users=  await signInWithEmailAndPassword(auth,email, password);
            localStorage.setItem('user', JSON.stringify(users.user));
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error("Login failed. Please check your email and password.");
        }
    };

    const handleForgotPassword = async () => {
        try {
            await sendPasswordResetEmail(auth,email);
            toast.success("Password reset email sent. Check your inbox.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to send password reset email.");
        }
    };

    return (
        <Layout>
               <div className='flex justify-center items-center h-screen'>
               
                   <div className='bg-gray-800 px-10 py-16 rounded-xl w-full max-w-md' style={{ backgroundColor: '#908a81' }}>
           
                    <div>
                        <h1 className='text-center text-white text-xl mb-6 font-bold'>Login</h1>
                    </div>
                    {isForgotPassword ? (
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                className='bg-gray-600 mb-6 px-4 py-3 w-full rounded-lg text-black placeholder-text-gray-200 outline-none'
                                placeholder='Email'
                                style={{ backgroundColor: '#e2e0dc' }}
                            />
                            <div className='flex justify-center mb-6'>
                                <button
                                    onClick={handleForgotPassword}
                                    className='bg-black w-full text-white font-bold px-4 py-3 rounded-lg'>
                                    Reset Password
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    name='email'
                                    className='bg-gray-600 mb-6 px-4 py-3 w-full rounded-lg text-black placeholder-text-gray-200 outline-none'
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
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                login();
                                            }
                                        }}
                                        className='bg-gray-600 mb-6 px-4 py-3 w-full rounded-lg text-black placeholder-text-gray-200 outline-none pr-10'
                                        placeholder='Password'
                                        style={{ backgroundColor: '#e2e0dc' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute inset-y-0 right-0 px-4 text-black rounded-r-lg focus:outline-none flex items-center justify-center'
                                        style={{marginBottom:'15px'}} >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-center mb-6'>
                                <button
                                    onClick={login}
                                    className='bg-black w-full text-white font-bold px-4 py-3 rounded-lg'>
                                    Login
                                </button>
                            </div>
                            <div>
                                <h2
                                    className='text-white text-center text-lg cursor-pointer'
                                    onClick={() => setIsForgotPassword(true)}
                                >
                                    Forgot Password?
                                </h2>
                            </div>
                        </>
                    )}
                    <div>
                        <h2 className='text-white text-center text-lg'>
                            Don't have an account yet?
                            <Link
                                className='text-black font-bold px-1'
                                to={'/signup'}
                                style={{ transition: 'transform 0.3s ease-in-out', display: 'inline-block' }}
                                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.15)'; }}
                                onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                            >
                                Signup
                            </Link>
                        </h2>
                    </div>
                </div>
      
            </div>
        </Layout>
    );
}


export default Login;
