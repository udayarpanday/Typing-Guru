import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Header from './Header';

const ForgetPassword = () => {
  const [resetData, setresetData] = useState({
    email: '',
    textChange: 'Submit'
  })
  const { email, textChange } = resetData
  //handle change from inputs
  const handleChange = text => e => {
    setresetData({ ...resetData, [text]: e.target.value })
  }
  //submit data to backend
  const handleSubmit = e => {
    e.preventDefault()
    if (email) {
      setresetData({ ...resetData, textChange: 'Submitting' });
      toast.success(`Please wait while your request is being processed`)
      axios.put(`${process.env.REACT_APP_API_URL}/forgotpassword`, {
        email,
      }).then(res => {
        setresetData({
          ...resetData,
          email: '',
        })
        toast.success(`Please check your email at ${email}`)
      }).catch(err => {
        toast.error(err.response.data.error);
        toast.error(err.response.data.errors);
      });
    }
  }

  return (
    <>
      <Header />
      <div className='auth-container'>
        <ToastContainer />
        <div className='reset-wrapper'>
          <div className='reset-items'>
            <div className='login-form'>
              <div className='section-title'>
                <h1>Password Reset</h1>
                <p style={{ textAlign: 'center' }}>Enter your email address that you used to register. We'll send you an email with a link to reset your password.</p>
              </div>
              <form onSubmit={handleSubmit}>
                <div className='login-input'>
                  <div className='login-fields'>
                    <div className='login-header'>
                      <h4>Email Address</h4>
                    </div>
                    <div className='login-box'>
                      <input
                        type='email'
                        placeholder='Email Address'
                        onChange={handleChange('email')}
                        value={email}
                        className='input-box'
                      />
                    </div>
                    <button
                      type='submit'
                      className='options-btn' style={{ width: '18%' }}>
                      <h3>{textChange}</h3>
                    </button>
                    <h4>If you still need help, contact at fyp.typingguru@gmail.com</h4>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>


      </div>
    </>
  );
}

export default ForgetPassword
