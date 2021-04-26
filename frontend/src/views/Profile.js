import React, { useState, useEffect } from 'react';
// import authSvg from '../assests/update.svg';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Header from './Header';

const Profile = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    confirmpass: '',
    password: '',
    textChange: 'Update',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const { name, email } = res.data;
        setFormData({ ...formData, name, email });
      })
      .catch(err => {
        toast.error(`Error To Your Information ${err.response.statusText}`);
        if (err.response.status === 401) {
          signout(() => {
            history.push('/login');
          });
        }
      });
  };
  const { name, email, confirmpass, password, textChange, } = formData;
  const handleChange = text => e => {
    setFormData({ ...formData, [text]: e.target.value });
  };
  const handleSubmit = e => {
    const token = getCookie('token');
    console.log(token);
    e.preventDefault();
    if (password === confirmpass) {
      setFormData({ ...formData, textChange: 'Submitting' });
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/user/update`,
          {
            name,
            email,
            password: password
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        .then(res => {
          updateUser(res, () => {
            toast.success('Profile Updated Successfully');
            setFormData({ ...formData, textChange: 'Update', confirmpass: '', password: '' });
          });
        })
        .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.error);
          setFormData({ ...formData, textChange: 'Update' });
        });
    } else {
      toast.error('The two passwords must match')
    }

  };

  return (
    <> <ToastContainer />
      <Header />
      <div className='custom-container'>
        <div className='profile-wrapper'>
          <div className='section-title'>
            <h2>Profile</h2>
          </div>
          <div className='profile-tabs'>
            <div className='user-tab'>
              <form onSubmit={handleSubmit}>
                <div className='login-fields'>
                  <div className='login-header'>
                    <h5>User Name</h5>
                  </div>
                  <div className='login-box'>
                    <input
                      type='name'
                      placeholder='Username'
                      className='input-box'
                    />
                  </div>
                  <div className='login-header'>
                    <h5>Email Address</h5>
                  </div>
                  <div className='login-box'>
                    <input
                      type='email'
                      placeholder='Email'
                      disabled
                      value={email}
                      className='input-box'
                    />
                  </div>
                  <div className='login-header'>
                    <h5>Name</h5>
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

                  <div className='section-title'>
                    <h2>Change Password</h2>
                  </div>
                  <div className='login-header'>
                    <h5>Password</h5>
                  </div>
                  <div className='login-box'>
                    <input
                      className='input-box'
                      type='password'
                      placeholder='Password'
                      onChange={handleChange('password')}
                      value={password}
                    />
                  </div>
                  <div className='login-header'>
                    <h5>Confirm Password</h5>
                  </div>
                  <div className='login-box'>
                    <input
                      className='input-box'
                      type='password'
                      placeholder='Confirm Password'
                      onChange={handleChange('confirmpass')}
                      value={confirmpass}
                    />
                  </div>
                  <button type='submit' className='options-btn ' style={{ width: '35%' }}>
                    <h4>{textChange}</h4>
                  </button>
                  <button className='options-btn' style={{ width: '35%' }}
                    onClick={() => {
                      signout(() => {
                        toast.success('Signout Successfully');
                        history.push('/home');

                      });
                    }}
                  >
                    <h4 className='ml-3'>Signout</h4>
                  </button>
                </div>
              </form>
            </div>
            <div className='goals-tab'>
              <div className='section-title'>
                <h2>Personal Goals</h2>
              </div>
              <div className='login-header'>
                <h5>Daily Goals</h5>
              </div>
              <select name="daily" id="daily">
                <option value="5min">5 minutes</option>
                <option value="15min">15 minutes</option>
                <option value="30min">30 minutes</option>
                <option value="60min">50 minutes</option>
              </select>

              <div className='login-header'>
                <h5>Weekly Goals</h5>
              </div>
              <select name="daily" id="daily">
                <option value="1hr">1 hour</option>
                <option value="2hr">2 hour</option>
                <option value="3hr">3 hour</option>
                <option value="4hr">4 hour</option>
              </select>
              <p>Set personal goals both daily and weekly to track yourself of how much your are practicing and also
              perform times ocasionally to test how your typing has increased.
            </p>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default Profile;
