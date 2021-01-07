import React from 'react'
import { Bar } from 'react-chartjs-2'

// function to plot chart results upon quiz completion
function Chart( { score, classAverage, nQuestions } ) {

    const data = {
        labels: ['You VS Class'],
        datasets: [
            {
                label: 'Your Score',
                data: [score],
                backgroundColor: [
                    'rgba(255, 99, 132)'
                ]
            },
            {
                label: 'Class Average',
                data: [classAverage],
                backgroundColor: [
                    'rgba(54, 162, 235)'
                ]
            }
        ]
    }

    const options = {
        title: {
            display: true,
            text: 'Bar Chart for Quiz'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: nQuestions,
                        stepSize: 0.5
                    }
                }
            ],
            xAxes: [
                {
                    barThickness: 'flex'
                }
            ]
        }
    }

    return (
        <div className="chart">
            <Bar 
            data={data}
            width={100}
            height={50}
            options={options}
            />
        </div>
    )
}


export default Chart;