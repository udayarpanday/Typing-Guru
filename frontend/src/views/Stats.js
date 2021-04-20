import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Header from './Header'
import {Spinner} from 'react-bootstrap'



const Stats = ({ history,props }) => {
  
  const [state,setState] = useState("");
  const [loading,setLoading]=useState(null)
  const [totalLessons,setTotalLessons]=useState(null)
  useEffect(() => {
      getData()
  }, [])
  const getData=()=>{
    const token = getCookie('token');
      axios 
      .get(`${process.env.REACT_APP_API_URL}/stats/${isAuth()._id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res=>{
          // const { lessonname, lessondetails } = res.data;
        setState(res.data);
        console.log(res.data);
        setTotalLessons(res.data.length)
      })
      
      .catch(err=>{
          console.log(err.response);
      
      })
  }
  var avgSpeed=[]
  var avgAcc=[]
  var sum;
  let avg;


  

  return (
      <>
          <Header/>
          <div className='lessons-wrapper'>
              <div className='custom-container'>
                  <div className='title'>
                    <h1>
                      Total Lessons Completed:{totalLessons}
                    </h1>
                  
                  </div>
                  <div className='lessons-container'>
                
                  {state&&Object.values(state).map((data)=>{
                    //   console.log(data)
                    if(data.stats){
                      avgSpeed.push(data.stats.Speed)
                      avgAcc.push(data.stats.Accuracy)
                      console.log(avgSpeed)
                        return (
                            <div className='lessons-items'>
                                <div className='inner'>
                                    <div>
                                        <table>
                                          <tr>
                                            <th>Lesson Name</th>
                                            <th>Speed</th>
                                            <th>Accuracy</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                          </tr>
                                          <tr>
                                            <td>{data.lessons}</td>
                                            <td>{data.stats.Speed}</td>
                                            <td>{data.stats.Accuracy} </td>
                                            <td>{data.stats.Date}</td>
                                            <td>{
                                              let given_seconds = data.stats.Time
  
                                              dateObj = new Date(given_seconds * 1000);
                                              hours = dateObj.getUTCHours();
                                              minutes = dateObj.getUTCMinutes();
                                              seconds = dateObj.getSeconds();
                                    
                                              timeString = hours.toString().padStart(2, '0')
                                                  + ':' + minutes.toString().padStart(2, '0')
                                                  + ':' + seconds.toString().padStart(2, '0');
                                    
                                              document.querySelector('.output').textContent
                                                          = timeString;
                                            }</td>
                                          </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    }    
                  }) 
                    }
                    
                  </div>
               </div>
          </div>
          <div className='stats-board'>
            <div className='avg-speed'>
              Average Accuracy:{ avg = Math.round((avgAcc.reduce((a, b) => a + b, 0) / avgAcc.length) || 0)}
            </div>
            <div className='avg-acc'>
              Average Speed:{ avg = Math.round((avgSpeed.reduce((a, b) => a + b, 0) / avgSpeed.length) || 0)}
            </div>
          </div>
      </>
  )
}


export default Stats
