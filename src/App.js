import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import { ToastContainer } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'

import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import Explore from './pages/Explore'
import Hot from './pages/Hot'
import Wall from './pages/Wall'
import Profile from './pages/Profile.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp'
import UserPage from './pages/UserPage'
import CreateListing from './pages/CreateListing'
import ForgotPassword from './pages/ForgotPassword.jsx'
import { ToastContainer } from 'react-toastify'
import Test from './pages/Test'

function App() {
  return (
    <>
      <Router>
       
        <Routes>
          
          <Route path='/wall' element={<Wall/>}/>
          <Route path='/profile' element={<PrivateRoute/>}>
            <Route path='/profile' element={<Profile/>}/>
          </Route>
          <Route path='/hot' element={<PrivateRoute/>}>
            <Route path='/hot' element={<Hot />} />
          </Route>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<Explore/>}/>
          </Route>
          <Route path='/user' element={<PrivateRoute />}>
            <Route path='/user/:userId' element={<UserPage/>}/>
          </Route>
          <Route path='/sign-in' element={<SignIn/>}/>
          <Route path='/sign-up' element={<SignUp/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>}/>
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/test' element={<Test />} />
          
        </Routes>
        <Navbar/>
      </Router>
      <ToastContainer/>


      </>
  );
}

export default App;
