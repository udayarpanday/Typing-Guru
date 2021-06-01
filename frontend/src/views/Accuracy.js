import React from 'react'

export default (props) => {
    if (props.symbols !== 0) {
        let accuracy
        let symbols = props.symbols                       //Number of correct words
        let total_words = props.userInput//Total user input
        if (props.userInput) {
            accuracy = (symbols / total_words.length) * 100     //calculate accuracy
        } else {
            accuracy = 0
        }

        return (
            <div>{Math.round(accuracy)} %</div>
        )
    }
    return '0%';
}
