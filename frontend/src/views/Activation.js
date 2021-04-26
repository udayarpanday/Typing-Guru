import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { isAuth } from '../helpers/auth';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { Redirect } from 'react-dom';
import Header from './Header';


const Activation = ({ match }) => {
  const [activeData, setactiveData] = useState({
    data: '',
    token: '',
    show: true
  })

  useEffect(() => {
    //get token form params and decode to get name
    let token = match.params.token
    let data = jwt.decode(token)
    console.log(data)
    if (token) {
      setactiveData({ ...activeData, data, token })
    }
  }, [])
  const { data, token, show } = activeData
  const handleSubmit = e => {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/activation`, {
      token
    }).then(res => {
      setactiveData({ ...activeData, show: false })
      toast.success(res.data.message);

    })
      .catch(err => {
        toast.error(err.response.data.error);
      });
  }
  return (
    <>
      <Header />
      <div className='auth-container'>
        {isAuth() ? <Redirect to='/' /> : null}
        <ToastContainer />
        <div className='reset-wrapper'>
          <div className='reset-items'>
            <div className='section-title'>
              <h1>
                Welcome {data.name} !!
              </h1>
              <p style={{ textAlign: 'center' }}>Account created with <b>{data.email}</b> email account. Click the activate account button below to confirm and save your created account. </p>
            </div>
            <form onSubmit={handleSubmit}>

              <div style={{ textAlign: 'center' }}>
                <button
                  type='submit'
                  className='options-btn'
                  style={{ width: '30%' }}
                >
                  <h3>Activate your Account</h3>
                </button>
                <hr style={{ width: '75%' }}></hr>
                <h4>Please login again after activating your account</h4>
              </div>
            </form>

          </div>
        </div>

      </div>
    </>
  );
}

export default Activation
