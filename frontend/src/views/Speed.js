import React from 'react';
import { useGlobalContext } from '../helpers/context';
let total_wpm=[]

export default (props) => {
  // const { total,wpm,rsetTotalWpm,totalAcc,setTotalAcc,totalMistake, setTotaMistake } = useGlobalContext();
  if (props.symbols !== 0 && props.sec !== 0) {
    let wpm = (props.symbols/5) / (props.sec/60);
    total_wpm.push(wpm)

    return (
      <>
      {/* <div>{Math.round(total_wpm)}</div> */}
      <div>{Math.round(wpm)} wpm</div>
      </>
    )
    
  }
  return '0 wpm';
}