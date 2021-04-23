import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
const ResetPassword = ({match,history}) => {
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
    <div className='auth-container'>
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
                </div>
                  </div>
                </div>
                </form>
            </div>
          </div>
        </div>
        </div>
      
   </>
  );
};

export default ResetPassword;
