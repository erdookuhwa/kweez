import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from './firebase'
import Select from 'react-select'
import './App.css'
import CreatedQuiz from './CreatedQuiz'


function AddQuestions(props) {
    let { id } = useParams()

    const [newQuestion, setNewQuestion] = useState('')
    const [options, setOptions] = useState(['', ''])
    const [correct, setCorrect] = useState('')
    const [addedQuestions, setAddedQuestions] = useState([])
    const [numberOfQuestions, setNumberOfQuestions] = useState(0)   // track number of questions that have been added to the quiz
    const [createQuiz, setCreateQuiz] = useState('false')


    // make reference to database in firestore
    const questionDB = firebase.firestore()

    const handleAddNextQuestion = (e) => {
        e.preventDefault();
        const count = numberOfQuestions + 1
        setNumberOfQuestions(count)
        questionDB.collection(`quizzes/${id}/questions`).add({      // in firestore, point to the id just created and add to questions collection
            question: newQuestion,
            options: options,
            correct: correct
        }).then(doc => {
            console.log('Added data', doc)
            console.log({addedQuestions})
            console.log(addedQuestions.map(aq => console.log(aq)))
            console.log(typeof(addedQuestions.map(aq => console.log(aq))))
        })
        setNewQuestion('');
        setOptions(['']);
        setCorrect('')
    }

    useEffect(() => {
        questionDB.collection(`quizzes/${id}/questions`).onSnapshot((snap) => {
           setAddedQuestions(snap.docs.map(doc => doc.data()))
           });
        }, [])

    // display added questions on the page
    let displayAddedQuestions = addedQuestions.map(q => <p>{q.question}</p>)

    let updateOption = (s, i) => {
        let copyOptions = [...options]
        copyOptions[i] = s
        setOptions(copyOptions)
    } 

    let removeOption = (e) => {
        e.preventDefault()
        let copyOptions = [...options]
        copyOptions.pop()
        setOptions(copyOptions)
    }

    const showThis = <h6>Your quiz can be found at localhost:3000/quiz/{id} or <a target="_blank" href={`localhost:3000/quiz/${id}`}>by using this link</a> </h6>

    if (!createQuiz) {
        return <CreatedQuiz />
    }

    let optionElements = options.map((option, i) => <em> <input onChange={(e) => updateOption(e.target.value, i)} value ={option} /> </em>)

    return (
        <div className="container">
            <form id="addquestions-form" onSubmit={handleAddNextQuestion}>
                <h6 className="right-align">Number of questions added {addedQuestions.length}</h6>
                <br />
                <div className="card">
                    <h6>Question</h6><textarea name="Question" placeholder="Enter question here" onChange={e => setNewQuestion(e.target.value)} value={newQuestion}></textarea>
                </div>
                
                <div className="card">
                    <h6>Type your Options/Choices below</h6><p>{optionElements}</p>
                    
                    <p className="grey-text">Add another option? &nbsp;
                    <button className="btn-floating pulse" onClick={(e) => {
                        e.preventDefault();
                        setOptions([...options, ''])}}>+
                        </button>
                    </p>
                    <p className="grey-text">Remove last option? &nbsp; 
                        <button className="btn-floating pulse red" onClick={removeOption}>-</button>
                    </p>

                    <input name="correct" placeholder="Enter correct option here" onChange={e => setCorrect(e.target.value)} value={correct}></input>
                    <br /> <br />
                </div>
                
                {/* NOTE TO SELF... TO MAKE THE QUESTIONS DISPLAY IN THE MOST RECENT ADDED QUESTION ORDER, USE created_at STAMP */}
                {/* CAN USE - created_at: firebase.firestore.Timestamp.fromDate(now), where now = new Date() */}
                <div>{displayAddedQuestions}</div>

                <br />

                <button className="btn waves-effect waves-light">Add Next Question</button> &nbsp;
                <button className="btn waves-effect waves-light" onClick={() => setCreateQuiz(true) } >Create Quiz</button>

                {/* AFTER SUBMITTING CREATE QUIZ, THANK USER & DISPLAY LINK TO THEIR JUST ADDED QUIZ */}

            </form>
        </div>
    )
}

export default AddQuestions;