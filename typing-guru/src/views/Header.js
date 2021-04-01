import React,{useState} from 'react';
import { links } from '../assets/Links';
import {Link} from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  

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
                </div>
                    <div className='sidebar-items'>
                        <Link to='/Login'>
                            <button className='login-button'>Login</button>
                        </Link>
                        
                    </div>
            </div>
        </div>
          <aside className={`${isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}`}> 
          <div className='sidebar-header'>
               <h3>Typing Guru</h3>
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
