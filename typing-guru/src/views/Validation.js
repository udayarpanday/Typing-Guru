import React from 'react';

const Test =  (props) => {
  
  const text = props.text.split('');
  // console.log(text)
  return (
    <div className="border rounded p-3 mb-4">
      {
        text.map((character,i) => {
          let color;
          // console.log(i)
          if (i < props.userInput.length) {
            color = character === props.userInput[i] ? 'green' : 'yellow';
          }
          return (
            <span key={i} style={{backgroundColor: color, fontSize:'52px', fontFamily:'Devanagari'}}>{character}
            </span>
            )
          
        })
      }
    </div>
  )
}
export default Test;