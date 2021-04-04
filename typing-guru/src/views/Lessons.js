import React, {useState,useEffect} from 'react'
import Header from './Header'
import axios from 'axios';

const Lessons = (props) => {

    const [state,setState] = useState("");
    useEffect(() => {
        getData()
    }, [])
    const getData=()=>{
        axios 
        .get(`${process.env.REACT_APP_API_URL}/lessons`)
        .then(res=>{
            // const { lessonname, lessondetails } = res.data;
            setState(res.data);
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
                                            pathname: '/keyboard/'+data._id,
                                            data
                                          });
                                }} >
                                    <div className='inner'>
                                        <div>
                                            {data.lessonname}
                                        </div>
                                        <div>
                                            {data.lessondetails}
                                        </div>
                                    </div>
                                </button>
                            </div>
                                )
                               
                          })
                      }
                    
                    </div>
                    {/* <div className='section-title'>
                       <h1>Intermediate</h1> 
                    </div>
                    <div className='lessons-container'>
                        <div className='lessons-items'>
                                <button className='button-design'>
                                    <div className='inner'>
                                        <div className='title'>
                                            Introduction
                                        </div>
                                        <div>
                                            img
                                        </div>
                                        <div>
                                            Introduction to Touch typing
                                        </div>
                                    </div>
                                </button>
                            </div>
                        <div className='lessons-items'>
                                <button className='button-design'>
                                    <div className='inner'>
                                        <div className='title'>
                                            Introduction
                                        </div>
                                        <div>
                                            img
                                        </div>
                                        <div>
                                            Introduction to Touch typing
                                        </div>
                                    </div>
                                </button>
                            
                            </div>
                        <div className='lessons-items'>
                                <button className='button-design'>
                                    <div className='inner'>
                                        <div className='title'>
                                            Introduction
                                        </div>
                                        <div>
                                            img
                                        </div>
                                        <div>
                                            Introduction to Touch typing
                                        </div>
                                    </div>
                                </button>
                            
                            </div>     
                        <div className='lessons-items'>
                                <button className='button-design'>
                                    <div className='inner'>
                                        <div className='title'>
                                            Introduction
                                        </div>
                                        <div>
                                            img
                                        </div>
                                        <div>
                                            Introduction to Touch typing
                                        </div>
                                    </div>
                                </button>
                            
                            </div>     
                    
                    </div>
                 */}
                 </div>
            </div>
        </>
    )
}

export default Lessons
