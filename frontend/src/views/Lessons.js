import React, { useState, useEffect } from 'react'
import Header from './Header'
import axios from 'axios';
import { Spinner } from 'react-bootstrap'
import Stats from './Stats';
import Footer from './Footer';


const Lessons = (props) => {

    let type = []

    const [state, setState] = useState("");
    let complete = 'false'


    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/lessons`)
            .then(res => {
                setState(res.data);
            })

            .catch(err => {
                console.log(err.response);
            })
    }


    return (
        <>
            <Header />
            <div className='lessons-wrapper'>
                <div className='custom-container'>
                    <div className='section-title'>
                        <h1>Typing Lessons</h1>
                    </div>
                    <p>Here are some of the lessons labeled as number pratice as per the number and test your ability after ending all the practised lessons</p>
                    <div className='lessons-container'>
                        {state && state.map((data) => {
                            type.push(data.lessontype)
                            return (
                                <>
                                    <div className='lessons-items'>
                                        <button className='button-design' onClick={() => {
                                            props.history.push({
                                                pathname: '/typing-lesson/' + data._id,
                                                data
                                            });
                                        }} >
                                            <div className='inner'>

                                                <div>
                                                    <h4>{data.lessontype}</h4>
                                                    <h3>{data.lessonname}</h3>
                                                    <h2 style={{ fontFamily: 'Devanagari' }}>{data.lessondetails}</h2>
                                                </div>
                                            </div>
                                        </button>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Lessons