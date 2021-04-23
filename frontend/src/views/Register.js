import React, { useState } from 'react';
// import authSvg from '../assets/auth.svg';
import { ToastContainer, toast } from 'react-toastify';
import { authenticate, isAuth } from '../helpers/auth';
import axios from 'axios';
import { Redirect } from 'react-dom';
import Header from './Header';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    textChange: 'Sign Up'
  })
  const { email, name, password, confirmpass, textChange } = formData
  //handle change from inputs
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value })
  }
  //submit data to backend
  const handleSubmit = e => {
    e.preventDefault()
    if (name && email && password) {
      if (password === confirmpass) {
        setFormData({ ...formData, textChange: 'Submitting' });
        axios.post(`${process.env.REACT_APP_API_URL}/register`, {
          name,
          email,
          password: confirmpass
        }).then(res => {
          setFormData({
            ...formData,
            name: '',
            email: '',
            password: '',
            confirmpass: '',
            textChange: 'Sign In'
          })
          toast.success(res.data.message)
        }).catch(err => {
          setFormData({
            ...formData,
            name: '',
            email: '',
            password: '',
            confirmpass: '',
            textChange: 'Sign Up'
          });
          console.log(err.response);
          toast.error(err.response.data.errors);
        });
      } else {
        toast.error('The two passwords must match')
      }
    } else {
      toast.error('Please fill all the fields')
    }
  }
  return (
    <>
    <Header/>
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
            <form onSubmit={handleSubmit}>
              <div className='login-input'>
                <h2>Sign up with your email address</h2>
                <div className='login-fields'>
                  <div className='login-header'>
                    <h4>Full Name</h4>
                  </div>
                  <div className='login-box'>
                    <input
                      type='text'
                      placeholder='Name'
                      onChange={handleChange('name')}
                      value={name}
                      className='input-box'
                    />
                  </div>
                  <div className='login-header'>
                    <h4>Email Address</h4>
                  </div>
                  <div className='login-box'>
                    <input
                      type='email'
                      placeholder='Email'
                      onChange={handleChange('email')}
                      className='input-box'
                    />
                  </div>
                  <div className='login-header'>
                    <h4>Password</h4>
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
                  <div className='login-header'>
                    <h4>Confirm Password</h4>
                  </div>
                  <div className='login-box'>
                    <input
                      type='password'
                      placeholder='Confirm Password'
                      onChange={handleChange('confirmpass')}
                      value={confirmpass}
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
            </form>
            <hr></hr>
            <div className='register-section'>

              <h4>Have an Account?</h4>
              <button className='options-btn button'>
                <a href='/login' target='_self' >
                <h3  style={{ color: '#00ABAF' }}>Sign In</h3>
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register
