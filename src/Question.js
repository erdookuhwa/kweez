import React, { useState, useEffect } from 'react';
import './App.css'

function Question(props) {

    // make fxn to check if selected option is correct
    function isCorrect(option) {
        if (props.correct === option) {
            props.incrementScore();
        } else {
            console.log('incorrect!')
        }
        // go to the next question
        props.goToNextQuestion();
    }

    const options = props.options.map(option => <div className="card lime lighten-2 z-depth-3" onClick={() => isCorrect(option)}>
        <div className="card-action activator">{option}</div>
        </div>)

    return (
        <div className="container">
            <div>
                <span className="card-title center">{props.question}</span>
                <ul>
                    <li>{options}</li>
                </ul>
                {/* <h6>{props.correct}</h6> */}
            </div>
        </div>
        
    )
}


export default Question;