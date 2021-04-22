import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './Header';

const Login = ({ history }) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    textChange: 'Sign In'
  });
  const { email, password, textChange } = loginData;
  const handleChange = text => e => {
    setLoginData({ ...loginData, [text]: e.target.value });
  };

  const sendGoogleToken = tokenId => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/googlelogin`, {
        idToken: tokenId
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });
  };
  const informParent = response => {
    authenticate(response, () => {
      isAuth(history.push('/profile'))
    });
  };

  const responseGoogle = response => {
    console.log(response);
    sendGoogleToken(response.tokenId);
  };


  const handleSubmit = e => {
    console.log(process.env.REACT_APP_API_URL);
    e.preventDefault();
    if (email && password) {
      setLoginData({ ...loginData, textChange: 'Submitting' });
      axios
        .post(`${process.env.REACT_APP_API_URL}/login`, {
          email,
          password: password
        })
        .then(res => {
          authenticate(res, () => {
            setLoginData({
              ...loginData,
              email: '',
              password: '',
              textChange: 'Submitted'
            });
            if (isAuth()) {
              history.push('/profile');
            }
            toast.success(`Hey ${res.data.user.name}, Welcome back!`);
          });
        })
        .catch(err => {
          setLoginData({
            ...loginData,
            email: '',
            password: '',
            textChange: 'Sign In'
          });
          console.log(err.response);
          toast.error(err.response.data.error);
          toast.error(err.response.data.errors);
        });
    } else {
      toast.error('Please fill all fields');
    }
  };
  return (
    <>
      <Header />
      <div className='custom-container'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className='login-wrapper'>
          <div className='login-items'>
            <div className='banner-image'>
              <div className='section-title'>
                <h1>Sign Up for Typing Guru</h1>
              </div>
            </div>
            <div className='login-form'>
              <div className='login-options'>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='options-btn'>
                      <h3>Sign In with Google</h3>
                    </button>
                  )}
                ></GoogleLogin>
              </div>
              <button>
                <a href='/register' target='_self'>
                  <h3 className='options-btn'>Sign Up</h3>
                </a>
              </button>
              <div>
                <hr></hr>
                <p>Or with Sign In With E-mail</p>
                <div>
                <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password')}
                  value={password}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                  Forgot password?
                </Link>
              </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className=''>
        <div className=''>
          <div className='mt-12 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>
              Sign In for Typing Guru
            </h1>
            <div className='w-full flex-1 mt-8 text-indigo-500'>
              <div className='flex flex-col items-center'>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className=' p-2 rounded-full '>
                        <i className='fab fa-google ' />
                      </div>
                      <span className='ml-4'>Sign In with Google</span>
                    </button>
                  )}
                ></GoogleLogin>
                <a
                  className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3
           bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                  href='/register'
                  target='_self'
                >
                  <i className='fas fa-user-plus fa 1x w-6  -ml-2 text-indigo-500' />
                  <span className='ml-4'>Sign Up</span>
                </a>
              </div>
              <div className='my-12 border-b text-center'>
                <div className='leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2'>
                  Or sign In with e-mail
                </div>
              </div>
              <form
                className='mx-auto max-w-xs relative '
                onSubmit={handleSubmit}
              >
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                  type='email'
                  placeholder='Email'
                  onChange={handleChange('email')}
                  value={email}
                />
                <input
                  className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                  type='password'
                  placeholder='Password'
                  onChange={handleChange('password')}
                  value={password}
                />
                <button
                  type='submit'
                  className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                >
                  <i className='fas fa-sign-in-alt  w-6  -ml-2' />
                  <span className='ml-3'>Sign In</span>
                </button>
                <Link
                  to='/users/password/forget'
                  className='no-underline hover:underline text-indigo-500 text-md text-right absolute right-0  mt-2'
                >
                  Forgot password?
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
       */}
      </div>
    </>
  );
};

export default Login;