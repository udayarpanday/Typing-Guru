import React from 'react';
import { Line, Bar, } from 'react-chartjs-2'
let total_wpm = []
let total_acc = []
let wpm
const Data = {
    labels: ['Stats'],
    datasets: [
        {
            label: 'Speed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: total_wpm
        },
        {
            type: 'line',
            label: 'Average User Speed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(15,82,112,1)',
            borderColor: 'rgba(0,0,0,1)',
            data: [30]
        },
        {
            type: 'line',
            label: 'Intermediate User Speed',
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(225,192,92,1)',
            borderColor: 'rgba(0,0,0,1)',
            data: [80]
        }
    ]
}

const Level = () => {
    if (wpm < 30 || 0) {
        return<> 
        <h1>Tips</h1><br></br>
        <h2>Looks like you need more practice continue on with the lessons.</h2>
        </>
    } else if (wpm < 80) {
        return<> 
        <h1>Tips</h1><br></br>
         <h2>Great Job! You are typing as an average Nepali typist continue with the lessons to improve.</h2>
         </>
    } else {
        return <> 
        <h1>Tips</h1><br></br>
        <h2>WOW...You are offically a typing guru now.</h2>
        </> 
    }
}

export default (props) => {
    if (props.symbols !== 0 && props.sec !== 0) {
        wpm = (props.symbols / 5) / (props.sec / 60);
        total_wpm.push(Math.round(wpm))
        let accuracy
        let symbols = props.symbols
        let total_words = props.userInput.replace(' ', '');
        accuracy = (symbols / total_words.length) * 100
        total_acc.push(Math.round(accuracy))


        return (
            <>
                <div style={{ height: '250px', width: '500px' }}>
                    <Bar
                        data={Data}
                        options={{
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            responsive: true,
                            scale: {
                                yAxes: [{

                                    beginAtZero: true
                                }

                                ]

                            }

                        }}
                    />
                </div>
                <div>
                    {Level()}
                </div>
            </>

        )

    }
    return <>
    <h1>Tips</h1><br></br>
    <h2>Looks like you need more practice continue on with the lessons.</h2>
    </>

}
