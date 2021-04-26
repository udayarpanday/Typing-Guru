import React from 'react';

const Test = (props) => {

  const text = props.text.split('');
  let mistake = 0;
  const misChar = [];

  return (
    <div>
      {
        text.map((character, i) => {
          let color;
          let borderBottom
          let nextChar = []
          nextChar.push(character)
          if (i < props.userInput.length) {
            if (character === props.userInput[i]) {
              color = 'green';
              borderBottom = '3px solid green'
            } else {
              color = 'red';
              borderBottom = '3px solid red'
              mistake = mistake + 1
              misChar.push(character)
            }
          }
          return (
            <>
              <span key={i} style={{ color: color, fontSize: '50px', fontFamily: 'Devanagari', borderBottom: borderBottom }}>{character}
              </span>
            </>
          )

        })
      }
      
    </div>
  )
}
export default Test;