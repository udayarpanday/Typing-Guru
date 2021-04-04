import React from 'react'

export default (props)=>{
    if (props.symbols !== 0){
        let total_words=props.text.length;
        let accuracy=(props.symbols/(total_words-1))*100
        console.log(props.symbols)
        return (
            <div>{Math.round(accuracy)} %</div>
          )
    }
    return null;
}
