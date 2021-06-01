import React, { useState, useRef, useEffect } from 'react';
import { FaBullseye, FaRedo, FaTachometerAlt, FaCog, FaStopwatch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'
import { useGlobalContext } from '../helpers/context.js';
import Test from './Validation';
import Speed from './Speed';
import Accuracy from './Accuracy'
import Header from './Header';
import Modal from 'react-modal'
import { Dropdown } from 'react-bootstrap'
import ReactTooltip from "react-tooltip";
import Keyboard from './Keyboard';
import Charts from './Charts.js';
import getText from './text';


const TypingTest = () => {

  function getfocus() {
    document.getElementById('mytext').focus();
    // TypeTimer()
  }
  
  const [modalShow, setModalShow] = useState(false);
 
  const [text, setText] = useState(getText());

  useEffect(() => {
    activekey('')
  }, [text])

  const [userInput, setUserInput] = useState('');
  const [symbols, setSymbols] = useState('');
  const [next, setNext] = useState('');
  const [sec, setSec] = useState(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [timer, setSeconds] = useState(30);
  const [final, setFinal] = useState(timer);
  const [customModal, setcustomModal] = useState(false)
  const [isModalOpen, setisModalOpen] = useState(false);
  
  const [customText, setCustomText] = useState('');
  const [keyboard, setKeyboard] = useState({
    textChange: 'Hide Keyboard',
    display: true,
    show: 'block'

  })
  const [opacity, setOpacity] = useState(0)
  const { display, textChange } = keyboard
  const [type, setType] = useState({

    textChange: 'Press any key to start',
    display: 'block'
  })

  let interval = useRef(null)

  //functions on on your user input change
  const onUserInputChange = (input) => {
    const value = input.target.value;
    WPMcount();
    onFinish(value);
    nextSymbol(value);
    setUserInput(value);
    setSymbols(countCorrectSymbols(value));
    setNext(nextSymbol(value));
    activekey(value)

  }
  //start timer
  useEffect(() => {
    if (started) {
      TypeTimer()
    }

  }, [timer])

  //timer function to show modal when timer ends
  const TypeTimer = () => {
    if (timer > 0 && finished == false) {
      setTimeout(() => {
        setSeconds(timer - 1);
      }, 1000)
      setFinal(timer)
    } else {
      clearInterval(interval.current);
      setFinished(true);
      setSeconds(setisModalOpen(true));
    }
  }
  //restart button function
  const onRestart = () => {
    window.location.reload(true)
  }

  //modal show on text finish before time
  const onFinish = (userInput) => {
    if (userInput.length === text.length) {
      clearInterval(interval.current);
      setFinished(true);
      setisModalOpen(true)
      setModalShow(true)
    }
  }

  //count the lenght of correct symbols
  const countCorrectSymbols = (userInput) => {
    const quotes = text
    return userInput.split('').filter((s, i) => s === quotes[i]).length;

  }
  //to get both the correct and inccorrect index for next symbol 
  const countSymbols = (userInput) => {
    const quotes = text
    return userInput.split('').filter((s, i) => s === quotes[i] || s!=quotes[i]).length;

  }

  //next symbol to be pressed
  const nextSymbol = (userInput) => {
    return text[countSymbols(userInput)]
  }
  //start timer for
  const WPMcount = () => {
    if (!started) {
      setStarted(true);
      interval.current = setInterval(() => {
        setSec(sec => sec + 1)
      }, 1000)
    }
  }


  const activekey = (userInput) => {
    var x;
    x = document.querySelectorAll('.active')
    x.forEach(element => element.classList.remove('active'))
    if(userInput==""){
      document.querySelectorAll('.ref-primary-char').forEach(function (element) {
        if (element.innerHTML === text[0]) {
          element.parentNode.classList.add('active')
        }
      })
    }
    document.querySelectorAll('.ref-primary-char').forEach(function (element) {
      if (element.innerHTML === nextSymbol(userInput)) {
        
        element.parentNode.classList.add('active')
      }
    })


  }



  return (
    <>
      <ToastContainer />
      <Header />
      <section className='test-wrapper'>
        <div className='custom-container'>
          <div className='timer'>
            {timer}
          </div>
          <div className='stats-details '>
            <div className='stats-items'>
              <div className='speed-details' data-tip data-for="speedTip">
                <FaBullseye color='#00ABAF' size='34px' />
                <Speed sec={sec} symbols={symbols}></Speed>
              </div>
              <ReactTooltip id="speedTip" place="top" effect="solid">
                Your raw typing speed
              </ReactTooltip>
              <div className='accuracy-details' data-tip data-for="accuracyTip">
                <FaTachometerAlt color='#00ABAF' size='34px' />
                <Accuracy symbols={symbols} text={text} userInput={userInput}></Accuracy>
              </div>
              <ReactTooltip id="accuracyTip" place="top" effect="solid">
                Your typing accuracy
              </ReactTooltip>
            </div>
            <div></div>
            <div className='settings'>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  <FaStopwatch size='32px' data-tip data-for="timerTip" />
                </Dropdown.Toggle>
                <Dropdown.Menu  >
                  <div style={{ margin: '-40px 50px' }}>
                    <Dropdown.Item onClick={() => { if (!started) { setSeconds(15) } }} style={{ border: '1px solid', padding: '4px' }}>15 sec</Dropdown.Item>
                    <Dropdown.Item onClick={() => { if (!started) { setSeconds(30) } }} style={{ border: '1px solid', padding: '4px' }}>30 sec</Dropdown.Item>
                    <Dropdown.Item onClick={() => { if (!started) { setSeconds(60) } }} style={{ border: '1px solid', padding: '4px' }}>60 sec</Dropdown.Item>
                    <Dropdown.Item onClick={() => { if (!started) { setSeconds(120) } }} style={{ border: '1px solid', padding: '4px' }}>120 sec</Dropdown.Item>
                  </div>
                </Dropdown.Menu>

              </Dropdown>
              <ReactTooltip id="timerTip" place="top" effect="solid">
                Time
              </ReactTooltip>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  <FaCog size='32px' data-tip data-for="settingsTip" />
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item onClick={() => {
                    if (display) { setKeyboard({ ...keyboard, display: false, show: 'none', textChange: 'Show Keyboard' }) }
                    else {
                      setKeyboard({ ...keyboard, display: true, show: 'block', textChange: 'Hide Keyboard' })
                    }
                  }}>
                    {textChange}</Dropdown.Item>
                  <Dropdown.Item style={{ padding: '4px' }} onClick={() => { if (!started) {setcustomModal(true)}}
                  }>Custom text</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <ReactTooltip id="settingsTip" place="top" effect="solid">
                Settings
              </ReactTooltip>
              <button onClick={onRestart} data-tip data-for="restartTip">
                <FaRedo size='32px' />
              </button>
              <ReactTooltip id="restartTip" place="top" effect="solid">
                Restart
              </ReactTooltip>
            </div>

          </div>
          <div className='test-item'>
            <div className='typing-text'>
              <Test text={text} userInput={userInput} />
            </div>

            <textarea
              id='mytext'
              value={userInput}
              onChange={onUserInputChange}
              className="typing-area"
              readOnly={finished}
              onInput={TypeTimer}
              spellCheck="false"
            >
            </textarea>
          </div>
        </div>
      </section>
      <Modal isOpen={isModalOpen} ariaHideApp={false} onRequestClose={() => setisModalOpen(false)}>

        <div className='modal-wrapper'>
          <div clasName='section-title' style={{textAlign:'center'}}>
            <h1>Test Results</h1>
          </div>
          <div className='custom-container'>
            <div className='results-wrapper'>
              <div className='result-speed card-view'>
                <h3>Speed</h3>
                <Speed sec={sec} symbols={symbols}></Speed>
              </div>
              <div className='result-acc card-view'>
                <h3>Accuracy</h3>
                <Accuracy symbols={symbols} text={text} userInput={userInput}></Accuracy>
              </div>
              <div className='result-time card-view'>
                <h3>Time</h3>
                {15-final}s
            </div>
            </div>
            <div className='result-chart'>
              <Charts sec={sec} symbols={symbols} text={text} userInput={userInput}></Charts>
            </div>

          </div>
        </div>

        <div style={{ textAlign: 'center', }}>
          <button className='options-btn' style={{ textAlign: 'center', 'width': '20%', fontSize: '22px' }} onClick={() => window.location.reload(true)}>
            Close
            </button>
        </div>
      </Modal>
      <Modal isOpen={customModal} ariaHideApp={false} onRequestClose={() => setcustomModal(false)}>
        <div className='section-title'>
          <h1>Custom Text</h1>
          <p>Here you can cutomize the test scenario and be able to add your own text to test yourself.</p>
          <input className='customtext' onChange={event => setCustomText(event.target.value)} style={{height:'400px',width:'1310px',fontFamily:'Devanagari',fontSize:'50px'}}/>
          <br></br>
        </div>
        <div style={{ textAlign: 'center', }}>
            <button className='options-btn' style={{ textAlign: 'center', 'width': '20%', fontSize: '22px' }} onClick={() => setText(customText) || setcustomModal(false)}>Save</button>
      </div>
      </Modal>

      <Keyboard keyboard={keyboard} text={text} />
    </>
  );
};



export default TypingTest;
