import { useNavigate, useLocation } from 'react-router-dom'
import { BsFillLightningFIll } from 'react-icons'
import { FaFire, FaCompass, FaPlus, FaCog } from 'react-icons/fa'
import { getAuth, updateProfile } from "firebase/auth";
function SideBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const pathMactchRoute = (route) => {
        if (route == location.pathname)
        {
            return true
        }    
    }
    const auth = getAuth()
    const onLogout = () => {
        auth.signOut();
        navigate("/");
      };

    return (
        <ul className ='sidebar'>
            <li className = ' '
                onClick={() => navigate('/')}>
                <SideBarIcon icon={<FaCompass size="42" />} text='Explore' />
            </li>
            <li onClick={() => navigate('/hot')}>
                <SideBarIcon icon={<FaFire size="42" />} text='Trending' />
            </li>
            <li onClick={() => navigate('/create-listing')}>
                <SideBarIcon icon={<FaPlus size="42" />} text='Add Picture' />
            </li>
            <div>
            <li className='dropdown  ' component="div">
                <SideBarIcon icon={<FaCog size="42" tabIndex="0" />} text='Settings' />
                
                <ul tabIndex="0" className="sidebar-dropdown   ">
                    <li className='hover:bg-success' onClick={()=> navigate('/profile')}><a>Profile</a></li>
                    <li className='hover:bg-error' onClick={onLogout}><a>Logout</a></li>
                    </ul>
                  
            </li>
            </div>

        </ul>
    )
}

const SideBarIcon = ({icon, text = 'tooltip'}) =>(
    <div className ='px-12'><li className='sidebar-icon group ' >
        {icon}
        <span className='sidebar-tooltip group-hover:scale-100'>
            {text}
        </span>
    </li></div>)

export default SideBar
