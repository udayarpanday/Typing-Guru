import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Logo from '../assets/Logo.png'
import TypingSS from '../assets/Typing-SS.png';
import { authenticate, isAuth } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import Header from './Header';
import {
  FaGoogle
} from 'react-icons/fa';

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
                <h1>Sign In for Typing Guru</h1>
                <img src={Logo} alt="Logo" style={{ width: '100%', height: '100%' }} />
                <p style={{ textAlign: 'center' }}>Learn and test yourself of how good you are with Nepali typing </p>
              </div>
            </div>
            <div className='login-form'>
              <div className='login-options'>
                <h3>To continue, login into Typing Guru</h3>
                <GoogleLogin
                  clientId={`${process.env.REACT_APP_GOOGLE_CLIENT}`}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  render={renderProps => (
                    <button
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      className='options-btn button'>

                      <h3>Continue with Google</h3>
                    </button>
                  )}
                ></GoogleLogin>
              </div>

              <div>
                <hr style={{ width: '75%' }}></hr>
                <h4>Or with Sign In With E-mail</h4>
                <form onSubmit={handleSubmit}>
                  <div className='login-input'>
                    <div className='login-fields'>
                      <div className='login-header'>
                        <h5>Email Address</h5>
                      </div>
                      <div className='login-box'>
                        <input
                          type='email'
                          placeholder='Email'
                          onChange={handleChange('email')}
                          value={email}
                          className='input-box'
                        />
                      </div>
                      <div className='login-header'>
                        <h5>Password</h5>
                      </div>
                      <div className='login-box'>
                        <input
                          type='password'
                          placeholder='Password'
                          onChange={handleChange('password')}
                          value={password}
                          className='input-box'
                        />
                      </div>
                    </div>
                    <button
                      type='submit'
                      className='options-btn button'>
                      <h3>{textChange}</h3>
                    </button>
                  </div>
                  <Link to='/users/password/forget' style={{ textDecoration: 'underline' }}>
                    Forgot password?
                </Link>
                </form>
                <hr style={{ width: '75%' }}></hr>
                <div className='register-section'>
                  <h4>Don't have an account?</h4>
                  <button className='options-btn button'>
                    <a href='/register' target='_self'>
                      <h3 style={{ color: '#00ABAF' }} >Sign Up</h3>
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Login;