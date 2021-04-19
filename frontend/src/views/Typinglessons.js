import React, { useState, useRef, useEffect } from 'react';
import { FaBullseye, FaRedo, FaTachometerAlt,FaCog,FaStopwatch } from 'react-icons/fa';
import {toast, ToastContainer} from 'react-toastify'

import Test from './Validation';
import Speed from './Speed';
import Accuracy from './Accuracy'
import Header from './Header';
import Modal from 'react-modal'
import {Dropdown} from 'react-bootstrap'
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import Keyboard from './Keyboard';


const TypingLessons = (props) => {
  function getfocus() {
    document.getElementById('mytext').focus();
    // TypeTimer()
  }
  const [text,setText] =useState('');
  
  const calcSpeed=()=>{
    console.log('Sec'+sec)
    console.log('symbol'+symbols)
    if (symbols !== 0 && sec !== 0) {
      let wpm = (symbols/5) / (sec/60);
      console.log('data'+wpm)
      return wpm
    }else{
      return '100'
    }
  }
  const calcAccuracy=()=>{
    console.log('Sec'+sec)
    console.log('symbol'+symbols)
    if (symbols !== 0 && sec !== 0) {
      let wpm = (symbols/5) / (sec/60);
      console.log('data'+wpm)
      return wpm
    }else{
      return '100'
    }
  }
  const updateData=()=>{
    axios 
      .put(`${process.env.REACT_APP_API_URL}/lessons/${props.match.params.id}`,
      {
        speed:calcSpeed(),
        accuracy:calcAccuracy(),
      })
      .then(res=>{
        
      })
      .catch(err=>{
      })
  }
  useEffect(()=>{
    
      const getData=()=>{
          axios 
          .get(`${process.env.REACT_APP_API_URL}/lessons/${props.match.params.id}`)
          .then(res=>{
              console.log(res.data)
              setText(res.data.lessondetails)
      
          })
          .catch(err=>{
          })
      }
      getData();
      
      
  },[props])
 
useEffect(() => {
  getfocus()
})
  
  const [userInput,setUserInput]=useState('');
  const [symbols,setSymbols]=useState('');
  const [next,setNext]=useState('');
  const [sec,setSec]=useState(0);
  
  const [started,setStarted]=useState(false);
  const [finished,setFinished]=useState(false);
  
  const [timer, setSeconds] = useState(30);
  const [final, setFinal] = useState(timer);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [keyboard,setKeyboard]=useState({
    textChange:'Hide Keyboard',
    display:'block'
  })
  // const [opacity,setOpacity]=useState(0)
  const {display,textChange}=keyboard


  let interval = useRef(null)

  


  const onUserInputChange=(input)=>{
    const value=input.target.value;
    WPMcount();
    onFinish(value);
    nextSymbol(value);
    setUserInput(value);
    setSymbols(countCorrectSymbols(value));
    setNext(nextSymbol(value));

  }



  const TypeTimer=()=>{
    if (timer > 0 && finished==false) {
        setTimeout(() => {
          setSeconds(timer - 1);
        }, 1000)
        setFinal(timer)
      } else {
        clearInterval(interval.current);
        setFinished(true);
        // setSeconds(setisModalOpen(true));
      }
  }
  const onRestart=()=>{
    // setUserInput('')
    // setSymbols(0)
    // setSec(0)
    // setStarted(false)
    // setFinished(false)
    // clearInterval(start);
    window.location.reload(true)
  }


  const onFinish=(userInput)=>{
    if (userInput===text){
      clearInterval(interval.current);
      setFinished(true);
      setisModalOpen(true)
      setModalShow(true)
      }
    }
  
  const countCorrectSymbols=(userInput)=>{
    const quotes=text.replace(' ','');
    return userInput.replace(' ', '').split('').filter((s,i) => s === quotes[i]).length ;

  }
  const nextSymbol = (userInput)=>{
    const quotes=text;
    return userInput.replace(' ', '').split('').filter((s,i) => s === quotes[i]) ;
    
  }
  const WPMcount=()=>{
    if(!started){
      setStarted(true);
        interval.current=setInterval(()=>{
        setSec(sec=>sec+1)
      },1000)
    }
  }


  const activekey=(nextkey)=>{
    
  }
  // var x=[]
  //  x=document.getElementsByClassName('primary-char')
  //  for(var i=0;i<x.length;i++){
  //   console.log(x[i])
  //  }



  return (
    <>
    <ToastContainer/>
    <Header/>
      <section className='test-wrapper'>
        <div className='custom-container'>
          <div className='timer'>
            {timer}
          </div>
          <div className='stats-details'>
            <div className='stats-items'>
              <div className='speed-details' data-tip data-for="speedTip">
                <FaBullseye color='#00ABAF' size='34px'/>
                <Speed sec={sec} symbols={symbols}></Speed>
              </div>
              <ReactTooltip id="speedTip" place="top" effect="solid">
                Your raw typing speed
              </ReactTooltip>
              <div className='accuracy-details' data-tip data-for="accuracyTip">
              <FaTachometerAlt color='#00ABAF' size='34px'/>
                  <Accuracy symbols={symbols} text={text} userInput={userInput}></Accuracy> 
              </div>
              <ReactTooltip id="accuracyTip" place="top" effect="solid">
                Your typing accuracy
              </ReactTooltip>
            </div>
            <div className='settings'>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" >
              <FaStopwatch size='32px' data-tip data-for="timerTip"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={()=>setSeconds(15)}>15 seconds</Dropdown.Item>
                <Dropdown.Item onClick={()=>setSeconds(30)}>30 seconds</Dropdown.Item>
                <Dropdown.Item onClick={()=>setSeconds(60)}>60 seconds</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <ReactTooltip id="timerTip" place="top" effect="solid">
                Time
              </ReactTooltip>
              <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic" >
              <FaCog size='32px' data-tip data-for="settingsTip"/>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={onRestart}>Dark Mode</Dropdown.Item>
                <Dropdown.Item onClick={()=>setKeyboard({...keyboard,display:'none',textChange:'Show Key'})}>{textChange}</Dropdown.Item>
                {/* <Dropdown.Item onclick={onRestart}>Something else</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>
            <ReactTooltip id="settingsTip" place="top" effect="solid">
                Settings
              </ReactTooltip>
              <button onClick={onRestart} data-tip data-for="restartTip">
                <FaRedo size='32px'/>
              </button>
              <ReactTooltip id="restartTip" place="top" effect="solid">
                Restart
              </ReactTooltip>
            </div>
          
          </div>
          <div className='test-item'>
            <div className='typing-text'>
              <Test text={text} userInput={userInput}/>
            </div>
            
            <textarea
            id='mytext'
              value={userInput}
              onChange={onUserInputChange}
              className="typing-area"
              readOnly={finished}
              onInput={()=>TypeTimer()}
              > 
            </textarea>
          </div>
        </div>
      </section> 
        <Modal isOpen={isModalOpen} ariaHideApp={false} onRequestClose={()=>setisModalOpen(false)}>
          <h2>Your stats</h2>
          <Speed sec={sec} symbols={symbols}></Speed>
          <Accuracy symbols={symbols} text={text} userInput={userInput}></Accuracy> 
           {final} 

          <button onClick={()=>setisModalOpen(false)}>
            Close
          </button>
          
       </Modal> 
        <Keyboard/>
     </>
  );
};

export default TypingLessons;
