import React from 'react';
// import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from './Header.js';
import TypingSS from '../assets/Typing-SS.png';
import Footer from './Footer.js';


const Home = () => {
    return (
        <>
            <Header />
            <section className="image-wrapper">
                <div className="background-image" >
                    <div className="custom-container">
                        <div className="background-container">
                            <div className="section-title">
                                <h1>Learn Nepali Touch Typing</h1>
                            </div>
                            <div className="content">
                                <p>We value your learning experience, here you can take Nepali typing lessons for free, track your growth and even test yourself. </p>
                            </div>
                            <div className='button-section'>
                                <button className='options-btn' style={{ width: '20%' }}>
                                    <Link to='/lessons'>
                                        <h3 style={{ color: 'white' }}>Start Lessons</h3>
                                    </Link>
                                </button>
                                <button className='options-btn' style={{ width: '20%' }}>
                                    <Link to='/typing-test'>
                                        <h3 style={{ color: 'white' }}>Take a Test</h3>
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='details-wrapper'>
                <div className='custom-container'>
                    <div className='details-container'>
                        <div className='details-items'>
                            <img src={TypingSS} alt="Logo" />
                        </div>
                        <div className='details-items'>
                            <h2> What is TypingGuru</h2>
                            <p>It is web based and highly effective. TypingGuru is (and will always be) free for enthusaistics learners. </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='faq-wrapper'>
                <div className='custom-container'>
                    <div className='section-title'>
                        <h1>Why Typing Guru?</h1>
                    </div>
                    <div className='faq-container'>
                        <div className='faq-items'>
                            <h2>How you progress ahead?</h2>
                            <p>Keep practising the lessons and It really doesn't take much to learn, a few minutes a day for one to two weeks and you will be a pro!</p>
                        </div>
                        <div className='faq-items'>
                            <h2> Why should you take test?</h2>
                            <p>To find out your typing speed and accuracy, to understand whether you need to improve something. </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
};

export default Home;
