import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../fireabase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login failed. Please check your email and password.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }
    
   
    return (
        <div className='flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className='bg-gray-800 px-10 py-16 rounded-xl w-full max-w-md' style={{ backgroundColor: '#908a81' }}>
                <div>
                    <h1 className='text-center text-white text-xl mb-6 font-bold'>Login</h1>
                </div>
                <div>
                    <input 
                        type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-6 px-4 py-3 w-full rounded-lg text-white placeholder:text-black-200 outline-none'
                        placeholder='Email'
                        style={{ backgroundColor: '#e2e0dc' }}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className='bg-gray-600 mb-6 px-4 py-3 w-full rounded-lg text-white placeholder:text-black-200 outline-none'
                        placeholder='Password'
                        style={{ backgroundColor: ' #e2e0dc' }}
                    />
                </div>
                <div className='flex justify-center mb-6'>
                    <button
                        onClick={login}
                        className='bg-yellow-500 w-full text-black font-bold px-4 py-3 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white text-center'>Don't have an account <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login
