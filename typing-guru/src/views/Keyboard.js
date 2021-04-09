import React, { useState, useRef, useEffect } from 'react';
import { FaBullseye, FaRedo, FaTachometerAlt } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { getByText } from '@testing-library/react';
import Test from './Validation';
import Speed from './Speed';
import Accuracy from './Accuracy.js'
import Header from './Header';
import axios from 'axios';




// const test="pbo /fh kfK8]"
const Keyboard = (props) => {
    console.log(props);

    const [text,setText] =useState('');
    
    useEffect(()=>{
        const getData=()=>{
            axios 
            .get(`${process.env.REACT_APP_API_URL}/lessons/${props.match.params.id}`)
            .then(res=>{
                console.log(res.data)
                setText(res.data.lessondetails)
        
            })
            .catch(err=>{
                // console.log(err);
            })
        }
        getData();
        
    },[props])
    // console.log("the state is "+state);
    // const { lessondetails } = state||"test";
    // console.log("the lesson details is "+lessondetails);

 
   

    // const [text,setText] =useState(lessondetails);
//   const [text,setText] =useState(":;adsa'?/1290--10298");

  const [userInput,setUserInput]=useState('');
  const [symbols,setSymbols]=useState('');
  const [sec,setSec]=useState(0);
  const [started,setStarted]=useState(false);
  const [finished,setFinished]=useState(false);
  const [acc,setAccuracy]=useState(100);
  const [timer, setSeconds] = React.useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let interval = useRef(null)
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
 

  const onRestart=()=>{

  }


  const onUserInputChange=(input)=>{
    const value=input.target.value;
    // console.log(value)
    WPMcount();
    onFinish(value);
    nextSymbol(value);
    setUserInput(value);
    setSymbols(countCorrectSymbols(value));
    nextSymbol(value)
  }

 

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => setSeconds(timer - 1), 1000);
    } else {
      clearInterval(interval.current);
      setFinished(true);
      setSeconds('Thank You!');
    }
  });


  const onFinish=(userInput)=>{
    if (userInput.length===text.length){
      console.log('finished')
      clearInterval(interval.current);
      setFinished(true);
      openModal();
      }
    }
  
  const countCorrectSymbols=(userInput)=>{
    const quotes=text.replace(' ','');
    return userInput.replace(' ', '').split('').filter((s,i) => s === quotes[i]).length ;

    // return userInput.replace('','').split('').filter((s,i)) => s===text[i].length;
  }
  const nextSymbol = (userInput)=>{
    const quotes=text.replace(' ','');
    return (userInput.replace(' ', '').split('').filter((s,i) => s === quotes[i]).length)+1;
    
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
    console.log(nextSymbol)
  }

  return (
    <>
    <Header/>
      <section className='test-wrapper'>
        <div className='custom-container'>
        <div className='timer'>
        <h1>{timer}</h1>
      </div>
           <div className='test-contents'>
             <div className='test-item'>
             <Test text={text} userInput={userInput}/>
            <textarea
              value={userInput}
              onChange={onUserInputChange}
              className="typing-area"
              readOnly={finished}
            ></textarea>
            
              </div>
              <div className='test-item'>
                <div className='stats-board'>
                  <div className='speed-details'>
                    <FaTachometerAlt size='32px'/>
                    <h3>Speed</h3>
                  </div>
                  <Speed sec={sec} symbols={symbols}></Speed>
                  <div className='accuracy-details'>
                    <FaBullseye size='32px'/>
                    <h3>Accuracy</h3>
                  </div>
                    <Accuracy acc={acc} symbols={symbols} text={text}></Accuracy> 
                  <div className='restart'>
                  <button onClick={onRestart}>
                    <FaRedo size='32px'/>
                    <h3>Restart</h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section> 
       

      <section className='keyboard-layout'>
        <div className='custom-container'>
          <div className='keyboard-container themea' >
            <div className='keyboard'  >
              <div id='i0' className='key'>
                <span className="secondary-char">॥</span>
                <span className="primary-char">ञ</span>
                <span className="ref-primary-char">`</span>
              </div>
              <div id='i1' className='key'>
                <span className="secondary-char">ज्ञ</span>
                <span className="primary-char">१</span>
                <span className="ref-primary-char">1</span>
              </div>
              <div id='i2' className='key '>
                <span className="secondary-char">ई</span>
                <span className="primary-char">२</span>
                <span className="ref-primary-char">2</span>
              </div>
              <div id='i3' className='key'>
                <span className="secondary-char">घ</span>
                <span className="primary-char">३</span>
                <span className="ref-primary-char">3</span>
              </div>
              <div id='i4' className='key'>
                <span className="secondary-char">द्ध</span>
                <span className="primary-char">४</span>
                <span className="ref-primary-char">4</span>
              </div>
              <div id='i5' className='key'>
                <span className="secondary-char">छ</span>
                <span className="primary-char">५</span>
                <span className="ref-primary-char">5</span>
              </div>
              <div id='i6' className='key'>
                <span className="secondary-char">ट</span>
                <span className="primary-char">६</span>
                <span className="ref-primary-char">6</span>
              </div>
              <div id='i7' className='key'>
                <span className="secondary-char">ठ</span>
                <span className="primary-char">७</span>
                <span className="ref-primary-char">7</span>
              </div>
              <div id='i8' className='key'>
                <span className="secondary-char">ड</span>
                <span className="primary-char">८</span>
                <span className="ref-primary-char">8</span>
              </div>
              <div id='i9' className='key'>
                <span className="secondary-char">ढ</span>
                <span className="primary-char">ढ</span>
                <span className="ref-primary-char">9</span>
              </div>
              <div id='i10' className='key'>
                <span className="secondary-char">ण</span>
                <span className="primary-char">०</span>
                <span className="ref-primary-char">0</span>
              </div>
              <div id='i11' className='key'>
                <span className="secondary-char">ओ</span>
                <span className="primary-char">औ</span>
                <span className="ref-primary-char">-</span>
              </div>
              <div id='i12' className='key'>
                <span className="secondary-char">+</span>
                <span className="ref-primary-char">=</span>
              </div>
              <div id='i13' className='nc-key'>
                <span className="nc-key-text">Back</span>
              </div>
              <div id='i14' className='nc-key'>
                <span className="nc-key-text">Tab</span>
              </div>
              <div id='i15' className='key'>
                <span className="secondary-char">त्त</span>
                <span className="primary-char">त्र</span>
                <span className="ref-primary-char">q</span>
              </div>
              <div id='i16' className='key'>
                <span className="secondary-char">ड्ढ</span>
                <span className="primary-char">ध</span>
                <span className="ref-primary-char">w</span>
              </div>
              <div id='i17' className='key'>
                <span className="secondary-char">ऐ</span>
                <span className="primary-char">भ</span>
                <span className="ref-primary-char">e</span>
              </div>
              <div id='i18' className='key'>
                <span className="secondary-char">द्ब</span>
                <span className="primary-char">च</span>
                <span className="ref-primary-char">r</span>
              </div>
              <div id='i19' className='key'>
                <span className="secondary-char">ट्ट</span>
                <span className="primary-char">त</span>
                <span className="ref-primary-char">t</span>
              </div>
              <div id='i20' className='key'>
                <span className="secondary-char">ठ्ठ</span>
                <span className="primary-char">थ</span>
                <span className="ref-primary-char">y</span>
              </div>
              <div id='i21' className='key'>
                <span className="secondary-char">ऊ</span>
                <span className="primary-char">ग</span>
                <span className="ref-primary-char">u</span>
              </div>
              <div id='i22' className='key'>
                <span className="secondary-char">क्ष</span>
                <span className="primary-char">ष</span>
                <span className="ref-primary-char">i</span>
              </div>
              <div id='i23' className='key'>
                <span className="secondary-char">इ</span>
                <span className="primary-char">य</span>
                <span className="ref-primary-char">o</span>
              </div>
              <div id='i24' className='key '>
                <span className="secondary-char">ए</span>
                <span className="primary-char">उ</span>
                <span className="ref-primary-char">p</span>
              </div>
              <div id='i25' className='key'>
                <span className="secondary-char">ृ</span>
                <span className="primary-char">्र</span>
                <span className="ref-primary-char">[</span>
              </div>
              <div id='i26' className='key'>
                <span className="secondary-char">ै</span>
                <span className="primary-char">े</span>
                <span className="ref-primary-char">]</span>
              </div>
              <div id='i27' className='key'>
                <span className="secondary-char">ं</span>
                <span className="primary-char">्</span>
                <span className="ref-primary-char">\</span>
              </div>
              <div id='i28' className='nc-key'>
                <span className="nc-key-text">Caps Lock</span>
              </div>
              <div id='i29' className='key active'>
                <span className="secondary-char">आ</span>
                <span className="primary-char">ब</span>
                <span className="ref-primary-char">a</span>
              </div>
              <div id='i30' className='key'>
                <span className="secondary-char">ङ्क</span>
                <span className="primary-char">क</span>
                <span className="ref-primary-char">s</span>
              </div>
              <div id='i31' className='key'>
                <span className="secondary-char">ङ्ग</span>
                <span className="primary-char">म</span>
                <span className="ref-primary-char">d</span>
              </div>
              <div id='i32' className='key'>
                <span className="secondary-char">ँ</span>
                <span className="primary-char">ा</span>
                <span className="ref-primary-char">f</span>
              </div>
              <div id='i33' className='key'>
                <span className="secondary-char">द्द</span>
                <span className="primary-char">न</span>
                <span className="ref-primary-char">g</span>
              </div>
              <div id='i34' className='key'>
                <span className="secondary-char">झ</span>
                <span className="primary-char">ज</span>
                <span className="ref-primary-char">h</span>
              </div>
              <div id='i35' className='key'>
                <span className="secondary-char">ो</span>
                <span className="primary-char">व</span>
                <span className="ref-primary-char">j</span>
              </div>
              <div id='i36' className='key '>
                <span className="secondary-char">फ</span>
                <span className="primary-char">प</span>
                <span className="ref-primary-char">k</span>
              </div>
              <div id='i37' className='key'>
                <span className="secondary-char">ी</span>
                <span className="primary-char">ि</span>
                <span className="ref-primary-char">l</span>
              </div>
              <div id='i38' className='key'>
                <span className="secondary-char">ट्ठ</span>
                <span className="primary-char">स</span>
                <span className="ref-primary-char">;</span>
              </div>
              <div id='i39' className='key'>
                <span className="secondary-char">ू</span>
                <span className="primary-char">ु</span>
                <span className="ref-primary-char">'</span>
              </div>
              <div id='i40' className='nc-key'>
                <span className="nc-key-text">Enter</span>
              </div>
              <div id='i41' className='nc-key'>
                <span className="nc-key-text">Shift</span>
              </div>
              <div id='i42' className='key'>
                <span className="secondary-char">क्क</span>
                <span className="primary-char">श</span>
                <span className="ref-primary-char">z</span>
              </div>
              <div id='i43' className='key'>
                <span className="secondary-char">ह्य</span>
                <span className="primary-char">ह</span>
                <span className="ref-primary-char">x</span>
              </div>
              <div id='i44' className='key'>
                <span className="secondary-char">ऋ</span>
                <span className="primary-char">अ</span>
                <span className="ref-primary-char">c</span>
              </div>
              <div id='i45' className='key'>
                <span className="secondary-char">ॐ</span>
                <span className="primary-char">ख</span>
                <span className="ref-primary-char">v</span>
              </div>
              <div id='i46' className='key'>
                <span className="secondary-char">ौ</span>
                <span className="primary-char">द</span>
                <span className="ref-primary-char">b</span>
              </div>
              <div id='i47' className='key'>
                <span className="secondary-char">द्य</span>
                <span className="primary-char">ल</span>
                <span className="ref-primary-char">n</span>
              </div>
              <div id='i48' className='key'>
                <span className="secondary-char">ड्ड</span>
                <span className="primary-char"> ः</span>
                <span className="ref-primary-char">m</span>
              </div>
              <div id='i49' className='key'>
                <span className="secondary-char">ङ</span>
                <span className="primary-char">ऽ</span>
                <span className="ref-primary-char">,</span>
              </div>
              <div id='i50' className='key'>
                <span className="secondary-char">श्र</span>
                <span className="primary-char">।</span>
                <span className="ref-primary-char">.</span>
              </div>
              <div id='i51' className='key'>
                <span className="secondary-char">रु</span>
                <span className="primary-char">र</span>
                <span className="ref-primary-char">/</span>
              </div>
              <div id='i52' className='nc-key'>
                <span className="nc-key-text">Shift</span>
              </div>
              <div id='i54' className='nc-key'>
                <span className="nc-key-text">Fn</span>
              </div>
              <div id='i55' className='nc-key'>
                <span className="nc-key-text">Control</span>
              </div>
              <div id='i56' className='nc-key'>
                <span className="nc-key-text">Alt</span>
              </div>
              <div id='i56' className='nc-key'>
                <span className="nc-key-text">Command</span>
              </div>
              <div id='i57' className='key'>
                <span className="nc-key-text"></span>
              </div>
              <div id='i58' className='nc-key'>
                <span className="nc-key-text">Command</span>
              </div>
              <div id='i59' className='nc-key'>
                <span className="nc-key-text">Option</span>
              </div>
              <div className='key-placeholder'/>
              </div>
            </ div>
        </div>
      </section>
    </>
  );
};

export default Keyboard;
