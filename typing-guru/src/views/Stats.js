import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Header from './Header'

const speed=JSON.parse(localStorage.getItem('speed'))
const acc=JSON.parse(localStorage.getItem('accuracy'))


const Stats = ({ history }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
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
          setFormData({ ...formData,  name, email });
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
    const { name, email, password, textChange,  } = formData;
    const handleChange = text => e => {
      setFormData({ ...formData, [text]: e.target.value });
    };
    const handleSubmit = e => {
      const token = getCookie('token');
      console.log(token);
      e.preventDefault();
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
            setFormData({ ...formData, textChange: 'Update' ,password:''});
          });
        })
        .catch(err => {
          console.log(err.response);
          toast.error(err.response.data.error);
          setFormData({ ...formData, textChange: 'Update' });
        });
    };
  
    return (
      <>
      <Header/>
      <div className='stats-wrapper'>
        <div className='section-title'>
          Let's look at your stats
        </div>
        <div className=''>
        {Math.round(speed)}
        </div>
        <div className=''>
        {Math.round(acc)}
        </div>
      </div>
      
     </>
    );
  };

export default Stats
