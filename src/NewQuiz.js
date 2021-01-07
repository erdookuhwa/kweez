import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import { withRouter } from 'react-router-dom'
import './App.css'

function NewQuiz(props) {
    console.log('calling NewQuiz', {props})

    // make reference call to db where I want new quizzes to be saved to
    const db = firebase.firestore();

    // Make states for user's input
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')


    // make function to handle submit form
    const handleFormSubmit = (e) => {
        e.preventDefault();
        db.collection('quizzes').add({
            title: title,
            description: desc
        }).then(doc => {
            props.history.push(`/newquiz/${doc.id}/addquestions`)
        })
    }

    return (
        <div className="container">
            <form id="quiz-form" onSubmit={handleFormSubmit}>
                <h5>Quiz Title: </h5><input name="title" placeholder="Enter your quiz title" onChange={e => setTitle(e.target.value)}></input>
                <h5>Description: </h5><textarea maxLength="100" name="description" placeholder="Enter short description for your quiz" onChange={e => setDesc(e.target.value)}></textarea>
                <button className="btn waves-effect waves-light">Continue to enter questions</button>
            </form> 
        </div> 
    )
}

export default withRouter(NewQuiz);