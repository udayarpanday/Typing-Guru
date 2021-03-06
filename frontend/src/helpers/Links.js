import React from 'react'
import {
  FaHome,
  FaBookOpen,
  FaList,
  FaPen,
  FaLightbulb,
} from 'react-icons/fa';

export const links = [
  
  {
    id: 1,
    url: '/home',
    title: 'Home',
    className:'nav-text',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/stats',
    title: 'Stats',
    className:'nav-text',
    icon: <FaBookOpen />,
  },
  {
    id: 3,
    url: '/lessons',
    title: 'Lessons',
    className:'nav-text',
    icon: <FaList/>,
  },
  {
    id: 4,
    url: '/typing-test',
    title: 'Typing Test',
    className:'nav-text',
    icon: <FaPen />,
  },
  {
    id: 5,
    url: '/profile',
    title: 'Profile',
    className:'nav-text',
    icon: <FaLightbulb />,
  },

]

