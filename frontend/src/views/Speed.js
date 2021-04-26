import React from 'react';


export default (props) => {
  if (props.symbols !== 0 && props.sec !== 0) {
    let wpm = (props.symbols / 5) / (props.sec / 60);

    return (
      <>
        <div>{Math.round(wpm)} wpm</div>
      </>
    )

  }
  return '0 wpm';

}