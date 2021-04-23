import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
const ResetPassword = ({match}) => {
  const [changeData, setchangeData] = useState({
      password1: '',
      password2: '',
      token: '',
    textChange: 'Submit'
  });
    const { password1, password2, textChange, token } = changeData;
    
    useEffect(() => {
        let token = match.params.token
        console.log(match.params)
        if(token) {
            setchangeData({...changeData, token,})
        }
        
    }, [])
  const handleChange = text => e => {
    setchangeData({ ...changeData, [text]: e.target.value });
  };
    const handleSubmit = e => {
      console.log(password1, password2)
    e.preventDefault();
    if ((password1 === password2) && password1 && password2) {
      setchangeData({ ...changeData, textChange: 'Submitting' });
      axios
        .put(`${process.env.REACT_APP_API_URL}/resetpassword`, {
            newPassword: password1,
            resetPasswordLink: token
        })
        .then(res => {
          console.log(res.data.message)
            setchangeData({
              ...changeData,
               password1: '',
              password2: ''
            });
            toast.success(res.data.message);
          
        })
        .catch(err => {
          toast.error('Try again and make sure password have 6 characters');
        });
    } else {
      toast.error('Passwords don\'t matches');
    }
  };
  return (
    <>
    <Header/>
    <div className='custom-container'>
      <ToastContainer />
    <div className='reset-wrapper'>
          <div className='reset-items'>
            <div className='login-form'>
              <div className='section-title'>
              <h1>Password Reset</h1>
              </div>
                <form onSubmit={handleSubmit}>
                  <div className='login-input'>
                    <div className='login-fields'>
                      <div className='login-header'>
                        <h4>Password</h4>
                      </div>
                      <div className='login-box'>
                        <input
                          type='password'
                          placeholder='Password'
                          onChange={handleChange('password1')}
                          value={password1}
                          className='input-box'
                        />
                      </div>
                      <div className='login-header'>
                        <h4>Confirm Password</h4>
                      </div>
                      <div className='login-box'>
                        <input
                          type='password'
                          placeholder='Confirm password'
                          onChange={handleChange('password2')}
                          value={password2}
                          className='input-box'
                        />
                      </div>
                      <h4>Tip:Enter your password at least 6 characters long</h4>
                                        
                    <button
                      type='submit'
                      className='options-btn' style={{width:'18%'}}>
                      <h3>{textChange}</h3>
                    </button>
                    <hr style={{width:'50%'}}></hr>
                <div className='register-section'>
                  <h4>Login after password change</h4>
                  <button className='options-btn '>
                    <a href='/register' target='_self'>
                      <h3 style={{ color: '#00ABAF' }} >Sign Up</h3>
                    </a>
                  </button>
                </div>
                  </div>
                </div>
                </form>
            </div>
          </div>
        </div>
        </div>
      
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <ToastContainer />
      <div className='max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Reset Your Password
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='password'
                  onChange={handleChange('password1')}
                  value={password1}
                  />
                  <input
                  className='w-full mt-5 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='password'
                  placeholder='Confirm password'
                  onChange={handleChange('password2')}
                  value={password2}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>{textChange}</span>
                </button>
                <Link
                  to='/login'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Login</span>
                </Link>
              </form>
             
            </div>
          </div>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            
          ></div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default ResetPassword;
