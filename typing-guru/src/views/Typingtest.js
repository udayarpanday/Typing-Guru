import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';


const Typingtest = () => {
    const [testData, settestData] = useState({
        text:""
    })

    useEffect(() => {
        loadText();
    }, [])

    const loadText=()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/typing-test`)
    }
    const {text}=testData
    return (
        <div>
            Hi
            
        </div>
    )
}

export default Typingtest
