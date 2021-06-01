import React, { useState, useRef, useEffect } from 'react';
import { FaBullseye, FaRedo, FaTachometerAlt, FaCog, FaStopwatch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'

import Learn from './LessonValidation';
import Speed from './Speed';
import Accuracy from './Accuracy'
import Header from './Header';
import Modal from 'react-modal'
import { Dropdown } from 'react-bootstrap'
import ReactTooltip from "react-tooltip";
import axios from 'axios';
import { Link } from 'react-router-dom';
import Keyboard from './Keyboard';
import Charts from './Charts.js';



const TypingLessons = (props, history) => {
  const id = JSON.parse(localStorage.getItem('user'))
  function getfocus() {
    document.getElementById('mytext').focus();
  }

  const [text, setText] = useState('');

  const calcSpeed = () => {
    if (symbols !== 0 && sec !== 0) {
      let wpm = (symbols / 5) / (sec / 60);
      return Math.round(wpm)
    } else {
      return 0
    }
  }
  const calcAccuracy = () => {
    if (symbols !== 0) {
      let accuracy
      let total_words = userInput
      accuracy = (symbols / total_words.length) * 100
      return Math.round(accuracy)
    } else {
      return 0
    }
  }
  const updateData = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/lessons/${props.match.params.id}`,
        {
          speed: calcSpeed(),
          accuracy: calcAccuracy(),
          user_id: id._id,
          time: timer,
          completed: true

        })
      .then(res => {
        toast.success('Stats Updated')
      })
      .catch(err => {
        toast.error('Error')
      })
  }
  useEffect(() => {

    const getData = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/lessons/${props.match.params.id}`)
        .then(res => {
          console.log(res.data)
          setText(res.data.lessondetails)
          activekey('')

        })
        .catch(err => {
        })
    }
    getData();


  }, [props,text])

  useEffect(() => {
    getfocus()
  })


  const [userInput, setUserInput] = useState('');
  const [symbols, setSymbols] = useState('');
  const [next, setNext] = useState('');
  const [sec, setSec] = useState(0);

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [timer, setSeconds] = useState(0);
  const [final, setFinal] = useState(timer);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [keyboard, setKeyboard] = useState({
    textChange: 'Hide Keyboard',
    display: true,
    show:'block'

  })
  // const [opacity,setOpacity]=useState(0)
  const { display, textChange } = keyboard


  let interval = useRef(null)
  useEffect(() => {
    if (started) {
      TypeTimer()
    }

  }, [timer])



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



  const TypeTimer = () => {
    if (finished == false) {
      setTimeout(() => {
        setSeconds(timer + 1);
      }, 1000)
      setFinal(timer)
    } else {
      clearInterval(interval.current);
      setFinished(true);
      // setSeconds(setisModalOpen(true));
    }
  }
  const onRestart = () => {
    window.location.reload(true)
  }


  const onFinish = (userInput) => {
    if (userInput.length === text.length) {
      clearInterval(interval.current);
      setFinished(true);
      updateData()
      setisModalOpen(true)
      setModalShow(true)

    }
  }

  const countCorrectSymbols = (userInput) => {
    const quotes = text
    return userInput.split('').filter((s, i) => s === quotes[i]).length;

  }
  //to get both the correct and inccorrect index for next symbol 
  const countSymbols = (userInput) => {
    const quotes = text
    
    return userInput.split('').filter((s, i) => s === quotes[i] || s!=quotes[i]).length;

  }
  const nextSymbol = (userInput) => {
    console.log(text[0])
    return text[countSymbols(userInput)]
  }

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
          <div className='stats-details'>
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
            <div className='settings'>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic" >
                  <FaCog size='32px' data-tip data-for="settingsTip" />
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item onClick={() => {if(display) 
                  {setKeyboard({ ...keyboard, display:false,show: 'none', textChange: 'Show Keyboard' })}
                  else{
                    setKeyboard({ ...keyboard,display:true, show: 'block', textChange: 'Hide Keyboard' })
                  }}}>
                  {textChange}</Dropdown.Item>
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
              <Learn text={text} userInput={userInput} />
            </div>

            <textarea
              id='mytext'
              value={userInput}
              onChange={onUserInputChange}
              className="typing-area"
              readOnly={finished}
              onInput={TypeTimer}
              spellCheck='false'
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
                {calcSpeed()} wpm
              </div>
              <div className='result-acc card-view'>
                <h3>Accuracy</h3>
                {calcAccuracy()} %
              </div>
              <div className='result-time card-view'>
                <h3>Time</h3>
                {final}s
            </div>
            </div>
            <div className='result-chart'>
              <Charts sec={sec} symbols={symbols} text={text} userInput={userInput}></Charts>
            </div>

          </div>
        </div>
        <div style={{ textAlign: 'center', }}>
          <button className='options-btn' style={{ textAlign: 'center', 'width': '20%',fontSize:'22px' }} onClick={() => window.location.reload(true)}>
            Close
            </button>

        </div>

      </Modal>
      <Keyboard keyboard={keyboard}/>
    </>
  );
};

export default TypingLessons;
