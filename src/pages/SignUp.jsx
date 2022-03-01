import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config.js";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";



function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentual = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredentual.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="profile">
      <div className="listing-card ">
        <header>
          <p className="pb-4 content-center text-center text-xl">Sign Up</p>
        </header>
        <form onSubmit={onSubmit}>
          <div className="pb-4">
            <input
              type="text"
              className="input input-primary w-full text-black text-lg font-semibold "
              placeholder="Name"
              id="name"
              value={name}
              onChange={onChange}
            />
          </div>
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
              Sign up <i className="fa fa-upload" aria-hidden="true"></i>
            </button>
          </div>
        </form>
        <div className="text-center ">
          <OAuth />
          <Link to="/sign-in" className=" btn btn-accent text-center">
            Sign In Instead
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
