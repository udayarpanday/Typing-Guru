import React from 'react';
// import { FaBars } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Header from './Header.js';
import TypingSS from '../assets/Typing-SS.png';


const Home = () => {
  return (
      <>
      <Header/>
      <section className="image-wrapper">
        <div className="background-image" >
        {/* <div style={{width:'100%',height:'0',paddingBottom:'100%',position:'relative'}}>
            <iframe src="https://giphy.com/embed/pOZhmE42D1WrCWATLK" width="100%" height="100%" style={{position:'absolute'}} frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <p>
                <a href="https://giphy.com/gifs/animation-work-job-pOZhmE42D1WrCWATLK">via GIPHY</a>
                </p> */}
            <div className="custom-container">
                <div className="background-container">
                    <div className="section-title">
                        <h1>Learn Nepali Touch Typing</h1> 
                    </div>
                    <div className="content">
                        <p>We value your learning experience, here you can take Nepali typing lessons for free, track your growth and even test yourself. </p>
                    </div>
                    <div className='button-section'>
                        <button className='main-btn'>
                            <Link to='/lessons'>Start Lessons</Link>
                        </button>
                        <button className='main-btn'>
                            <Link to='/typing-test'>Take a Test</Link>
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
        <section className="footer-wrapper">
        <div className="footer-container">
                <div className="custom-container">
                    <div className="footer-section">
                        <div className="footer-items">
                            <h3>TypingGuru - 2020</h3>
                            <p>2020 TypingGuru. All rights reserved. </p>
                        </div>
                        <div className="footer-items">
                            <h3>Quick Links</h3>
                            <ul>
                                <li>Home</li>
                                <li>Stats</li>
                                <li>Lessons</li>
                                <li>Tips</li>
                                <li>Test</li>
                            </ul>
                        </div>
                        <div className="footer-items">
                            <h3>Information</h3>
                            <ul>
                                <li>Terms and Conditions</li>
                                <li>Privacy Policy</li>
                                <li>FAQ's</li>
                            </ul>
                        </div>
                        <div className="footer-items">
                            <h3>Contact Us</h3>
                            <ul>
                                <div className="footer-icons">
                                    {/* <img className='icon-style3' src="./icon/address.png"/> */}
                                    <li>Gongabu,Kathmandu</li>
                                </div>
                                <div className="footer-icons">
                                    {/* <img className='icon-style3' src="./icon/smailIcon.png"/> */}
                                    <li>fyp.typingguru@gmail.com</li>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>     
      </>
    )
};

export default Home;
