import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import myContext from '../../context/data/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../fireabase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import Layout from '../../components/layout/Layout';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

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
            toast.success("Signup Succesfully")
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false)
            navigate('/'); // Navigate to the home page on successful signup
            
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

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
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full rounded-lg text-black placeholder:text-black-200'
                        placeholder='Password'
                        style={{ backgroundColor: '#e2e0dc' }}
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={signup}
                        className='bg-black w-full text-white font-bold px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className='text-black font-bold' 
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
