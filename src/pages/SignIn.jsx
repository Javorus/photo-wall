import { useState } from 'react'
//import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'

function SignIn() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }
    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                navigate('/')
            }
        } catch (error) {
            //toast.error('Bad user credentials')
        }
        
        
    }
    return (
        <div className="grid justify-center text-lg  text-white font-bold">
            <div className="card shadow-2xl w-full h-full m-4 border-4 border-primary mt-40 p-2 bg-gray-700">
                <header className ='justify-center items-center grid'>
                    <p className="text-2xl ustify-center items-center grid"> Welcome Back!</p>
                </header>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={onChange}
                    />
                    <div className="InputDiv">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="passwordInput"
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={onChange}
                        />
                        <img
                            src={visibilityIcon}
                            alt="show password"
                            className="showPassword"
                            onClick={() => setShowPassword((prevState) => !prevState)}
                        />
                    </div>
                    
                    <Link to='/forgot-password' className="forgotPasswordLink">
                        Forgot Password
                    </Link>

                    <div className="signInBar">
                        <p className="signInText">
                            Sign in
                        </p>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height = '34px'/>
                        </button>
                    </div>
                </form>

                <OAuth/>
                <Link to='/sign-up' className="registerLink">
                    Sign Up Insted
                </Link>

            </div>
            
        </div>
    );
  }
  
  export default SignIn;
  