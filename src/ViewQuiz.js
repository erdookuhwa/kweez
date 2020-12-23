import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from './firebase'
import Question from './Question'
import './App.css'
import { type } from 'jquery'

function ViewQuiz(props) {

    let { id } = useParams()

    // LOGIC FOR NAVIGATING THRU THE QUESTIONS
    // Set states for dynamically updating values
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)   // manages state for the current question user is attempting
    const [finalScore, setFinalScore] = useState(false)   // manages logic responsible for displaying the score at the end of the quiz
    const [score, setScore] = useState(0)   // managing scoreboard for each correct question

    const [perc, setPerc] = useState([])

    // function to get all the questions in this quiz id to load on page
    function getQuiz() {
        const qRef = firebase.firestore().collection(`quizzes/${id}/questions`)
        qRef.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                items.push(doc.data());
            });
            setQuestions(items)
        })
    }

    const resultDB = firebase.firestore()

    // make function to handle all quiz takers' scores
    const quizResult = (e) => {
        e.preventDefault();
        resultDB.collection(`quizzes/${id}/results`).add({
            result: score
        }).then(doc => {
            // console.log({doc})
        })
    }

    function getResults() {
        const resDB = firebase.firestore().collection(`quizzes/${id}/results`)
        resDB.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                perc.push(doc.data())
                let yourScore;
                // percentile = score/tot scores * perc.length
                yourScore = perc[perc.length - 1].result

                // PERCENTILE
                // sortedPerc = perc.sort((a, b) => a - b)
                // countBelowYourScore = sortedPerc.filter( scores => (scores < yourScore) ).length
                // percentile = ( countBelowYourScore / sortedPerc.length ) * 100
                            
                // console.log( perc.forEach(res => res.result) )
                // console.log(`percentile is /${perc.length}`)
            })
        })
    }

    useEffect(() => {
        getQuiz();
    }, [id])    // check again why I passed [id] here, it works well as an empty list []


    getResults()
    let sum, classAverage, resultsTotal;
    resultsTotal = perc.forEach(val => sum += val)
    classAverage = resultsTotal / perc.length
    // console.log(`Class average is ${classAverage}`)


    let av = perc.map(p => p.result)
    let s = 0; let percent;
    console.log(av.forEach(v => s += v))
    percent = perc[perc.length - 1] / s
    console.log(percent)

    // make fxn to increment score
    const incrementScore = () => {
        setScore(score + 1)
    }

    // make function to display next question
    const handleGetNextQuestion = (props) => {  
        const nextQuestion = currentQuestion + 1
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion)
        } else {
            setFinalScore(true);
        }
    };

    const allQuestions = questions.map((q) => (
        <Question incrementScore={incrementScore} goToNextQuestion={handleGetNextQuestion} {...q} />
    ))

    return (
        <div className="container">
            <div className="viewquiz-app">
                <form onSubmit={quizResult} className="score-logic">
                    {finalScore ? (
                        <div className="card amber z-depth-3 center">
                            <div className="card-content center"><h5>Your final score is {score} / {allQuestions.length}</h5></div>
                            <button onClick={() => getResults, quizResult}>Compare results with other test takers</button>
                            <div>{classAverage}</div>
                        </div>
                    ) : (
                        <div className="container center">
                            <h4 className="right-align">Your score is {score} / {allQuestions.length} </h4>
                            <h4>Question {currentQuestion + 1} of {allQuestions.length}</h4>
                            <div className="container center"></div>
                            <div className="card amber">
                                <div className="card-content">{allQuestions[currentQuestion]}</div>
                            </div>
                        </div>
                    )}
                </form>
            </div>

        </div>
        )
}

export default ViewQuiz;