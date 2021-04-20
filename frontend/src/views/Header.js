import React,{useState,useEffect} from 'react';
import { links } from '../helpers//Links';
import {Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Logo from '../assets/Logo.png';
import {toast,ToastContainer} from 'react-toastify'

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };

    const user=JSON.parse(localStorage.getItem('user'))
    const [username, setName] = useState({
        names:''
      })
      const {names}=username
      useEffect(() => {
        if(!user){
            setName({...username,names:'Login'})
        }
        else{
        //   toast.success(`Hello ${user.name}`)
          const name=user.name.split(" ")[0]
          setName({...username,names:name})
        }
      }, [])

    return (
        <>
        <div className='sidebar-wrapper'>
            <div className='sidebar-container'> 
                <div className='sidebar-items'>
                    <button onClick={openSidebar} className='sidebar-toggle'>
                        <FaBars />
                    </button>
                </div>
                <div className='sidebar-items'>
                {/* <img src={Logo} alt="Logo" /> */}
                <Link to='/'>
                    <h1>Typing Guru</h1>
               </Link>
                </div>
                    <div className='sidebar-items'>
                        <Link to='/profile'>
                            <button className='login-button'>{names}</button>
                        </Link>
                        
                    </div>
            </div>
        </div>
          <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}> 
          <div className='sidebar-header'>
               <Link to='/'>
                    <h3>Typing Guru</h3>
               </Link>
              <button className='close-btn' onClick={closeSidebar}>
                  <FaTimes />
              </button>
          </div>
          <ul className='links'>
              {links.map((link) => {
              const { id, url, title,icon } = link;
              return (
                  <li key={id}>
                      <a href={url}>
                          {icon} {title}
                      </a>
                  </li>
              );
              })}
          </ul>
          </aside>
        </>
    );
};

export default Header
