import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link } from 'react-router-dom';
import Header from './Header'
import { Spinner } from 'react-bootstrap'

import { Line, Bar } from 'react-chartjs-2'


const Stats = ({ history, props }) => {


  var avgSpeed = []
  var avgAcc = []
  var sum;
  let avg;
  let avgTime;
  var totalTime = []
  var totalDate = []
  const [state, setState] = useState("");
  const [totalLessons, setTotalLessons] = useState(null)

  const LineData = {
    labels: totalDate,
    datasets: [
      {
        label: 'Speed',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(120,0,0,1)',
        borderWidth: 2,
        data: avgSpeed
      },
      {
        label: 'Accuracy',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(125,111,112,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: avgAcc
      }
    ]
  }
  const BarData = {
    labels: totalDate,
    datasets: [
      {
        label: 'Time',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: totalTime
      }
    ]
  }

  useEffect(() => {
    getData()
    timer()
  }, [])

  const timer = (times) => {
    let given_seconds = times
    let dateObj = new Date(given_seconds * 1000);
    let hours = dateObj.getUTCHours();
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    let timeString = hours.toString().padStart(2, '0')
      + ':' + minutes.toString().padStart(2, '0')
      + ':' + seconds.toString().padStart(2, '0');

    return (timeString)
  }


  const getData = () => {
    const token = getCookie('token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/stats/${isAuth()._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        // const { lessonname, lessondetails } = res.data;
        setState(res.data);
        console.log(res.data);
        setTotalLessons(res.data.length)
      })

      .catch(err => {
        console.log(err.response);

      })
  }




  return (
    <>
      <Header />

      <div className='stats-wrapper'>
        <div className='custom-container'>
          <div className='blank-space'>
          </div>
          <div className='stats-container'>
            <div className='section-title'>
              <h1>Recent Practices</h1>
            </div>


            <div className='stats-items'>
              <div className='inner'>
                <table>
                  <tr>
                    <th>Lesson Name</th>
                    <th>Speed</th>
                    <th>Accuracy</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>
                  {state && Object.values(state).map((data) => {
                    if (data.stats) {
                      avgSpeed.push(data.stats.Speed)
                      avgAcc.push(data.stats.Accuracy)
                      totalTime.push((data.stats.Time))
                      avgTime = totalTime.reduce((a, b) => a + b, 0)
                      totalDate.push((data.stats.Date).slice("", 24))
                      totalDate.sort()
                      return (
                        <tr>
                          <td>{data.lessons}</td>
                          <td>{data.stats.Speed} wpm</td>
                          <td>{data.stats.Accuracy} % </td>
                          <td>{timer(data.stats.Time)} hour</td>
                          <td>{(data.stats.Date).slice("", 24)}</td>
                        </tr>
                      )
                    }
                  })
                  }
                </table>
              </div>
            </div>

          </div>
          <div className='main-stats'>
            <div className='stats-board'>
              <div className='inner'>
                <div className='avg-speed'>
                  <h4>Average Speed</h4>
                  <h1>{avg = Math.round((avgSpeed.reduce((a, b) => a + b, 0) / avgSpeed.length) || 0)}</h1>
                </div>
                <div className='avg-acc'>
                  <h4>Average Accuracy</h4>
                  <h1>{avg = Math.round((avgAcc.reduce((a, b) => a + b, 0) / avgAcc.length) || 0)} %</h1>
                </div>
              </div>
            </div>
            <div className='personal-bests'>
              <div className='inner'>
                <div className='best-speed'>
                  <h4>Best Speed</h4>
                  <h1>{Math.max(...avgSpeed)}</h1>
                </div>
                <div className='best-acc'>
                  <h4>Best Accuracy</h4>
                  <h1>{Math.max(...avgAcc)} %</h1>
                </div>
              </div>
            </div>
            <div class='lesson-stats'>
              <div className='inner'>
                <div className='lesson-comp'>
                  <h4>Lessons Practised</h4>
                  <h1>{totalLessons}</h1>
                </div>
                <div className='lesson-time'>
                  <h4>Time Spend</h4>
                  <h1>{timer(avgTime)}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className='progress-overview'>
            <div className='section-title'>
              <h1>Progress Overview</h1>
            </div>
            <div className='card-view'>
              <Line
                data={LineData}
                options={{
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }}
              />
            </div>
          </div>
          <div className='progress-overview'>
            <div className='section-title'>
              <h1>Time Practiced</h1>
            </div>
            <div className='card-view'>
              <Bar
                data={BarData}
                options={{
                  legend: {
                    display: true,
                    position: 'top'
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Stats
