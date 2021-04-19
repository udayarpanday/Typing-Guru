import React, {useState,useEffect} from 'react'
import Header from './Header'
import axios from 'axios';
import {Spinner} from 'react-bootstrap'
import Stats from './Stats';

const Lessons = (props) => {

    const [state,setState] = useState("");
    const [loading,setLoading]=useState(null)
    useEffect(() => {
        getData()
    }, [])
    const getData=()=>{
        axios 
        .get(`${process.env.REACT_APP_API_URL}/lessons`)
        .then(res=>{
            // const { lessonname, lessondetails } = res.data;
            setState(res.data);
            setLoading(true);
        })
        
        .catch(err=>{
            console.log(err.response);
        
        })
    }
    const onClickHandler = (req,res)=>{
        console.log('test');
        console.log(state);
        // props.history.push({
        //     pathname: '/keyboard',
        //     state
        //   });
    }

    return (
        <>
            <Header/>
            <div className='lessons-wrapper'>
                <div className='custom-container'>
                    <div className='section-title'>
                       <h1>Beginner</h1> 
                    </div>
                    <div className='lessons-container'>
                      {state&&
                          state.map((data)=>{
                              console.log(data);
                              return (
                                <div className='lessons-items'>
                              
                                <button className='button-design' onClick={()=>{
                                    props.history.push({
                                            pathname: '/typing-lesson/'+data._id,
                                            data
                                          });
                                }} >
                                    <div className='inner'>
                                        <div>
                                            {loading ?(data.lessonname):(
                                                <Spinner animation='border'/>
                                            )}
                                        </div>
                                        <div>
                                            {data.lessondetails}
                                            {data.stats.map(stats => 
                                            <>
                                            <div>{stats.Speed}</div>
                                            <div>{stats.Accuracy}</div>
                                            <div>{stats.Date}</div>
                                            </>
                                            )}
                                        </div>
                                    </div>
                                </button>
                            </div>
                                )
                               
                          })
                      }
                    
                    </div>
                 </div>
            </div>
        </>
    )
}

export default Lessons
