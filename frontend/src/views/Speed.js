import React from 'react';
let total_wpm = []

export default (props) => {
  if (props.symbols !== 0 && props.sec !== 0) {
    let wpm = (props.symbols / 5) / (props.sec / 60);
    total_wpm.push(wpm)

    return (
      <>
        <div>{Math.round(wpm)} wpm</div>
      </>
    )

  }
  return '0 wpm';

}