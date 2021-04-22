import React from 'react';

const Learn =  (props) => {
  
  const text = props.text.split('');
  let mistake=0;
  const misChar=[];

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
      {
        text.map((character,i) => {
          let color;
          let borderBottom;
          let nextChar=[]
          nextChar.push(character)
          if (i < props.userInput.length) {
            if(character===props.userInput[i]){
              color='rgb(0 171 175 / 42%)';
              borderBottom='3px solid green'
            }else{
              color='#ef1d1d9e';
              borderBottom='3px solid red'
              mistake=mistake+1
              misChar.push(character)

            }
          }
          return (
            <>
            <span key={i} style={{background: color, fontSize:'45px', fontFamily:'Devanagari' ,padding:'10px 24px',color:'#5a5a5a',fontWeight:'bold',boxShadow: '0px 0px 10px -4px grey',margin:'10px',borderRadius:'10px',backgroundColor:'white',width:'20px'}}>{character}
            </span>
            </>
            )
            
        })
      }
      {/* {mistake}
      <div style={{display:'flex',fontFamily:'Devanagari'}}>
        
        {misChar}
      </div> */}
    </div>
  )
}
export default Learn;