import { useState } from 'react'
//import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import OAuth from '../components/OAuth'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import { FaEye } from "react-icons/fa";
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
        <div className="profile">
        <div className="listing-card ">
          <header>
            <p className="pb-4 content-center text-center text-xl">Sign In</p>
          </header>
          <form onSubmit={onSubmit}>
           
            <div className="">
              <input
                type="email"
                className="input input-primary w-full text-black text-lg font-semibold"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
            </div>
            <FaEye
              className="hover:text-primary "
              onClick={() => setShowPassword((prevState) => !prevState)}
            ></FaEye>
  
            <div className="passwordInputDiv flex flex-row pb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="input input-primary w-full text-black text-lg font-semibold"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
            </div>
  
            <div className="text-center pb-8">
              <p className="text-center"></p>
              <button className="btn btn-primary w-full">
                Sign in <i className="fa fa-upload" aria-hidden="true"></i>
              </button>
            </div>
          </form>
          <div className="text-center ">
            <OAuth />
            <Link to="/sign-up" className=" btn btn-accent text-center">
              Sign Up Instead
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default SignIn;
  