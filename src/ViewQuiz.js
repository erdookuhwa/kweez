import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from './Chart'
import { useParams } from 'react-router-dom'
import firebase from './firebase'
import Question from './Question'
import './App.css'

function ViewQuiz(props) {

    let { id } = useParams()


    // LOGIC FOR NAVIGATING THRU THE QUESTIONS
    // Set states for dynamically updating values
    const [questions, setQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)   // manages state for the current question user is attempting
    const [finalScore, setFinalScore] = useState(false)   // manages logic responsible for displaying the score at the end of the quiz
    const [score, setScore] = useState(0)   // managing scoreboard for each correct question
    const [hasSavedScore, setHasSavedScore] = useState(false)


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
    const saveResult = () => {
        resultDB.collection(`quizzes/${id}/results`).add({
            result: score
        }).then(doc => {
        })
    }

    function getResults() {
        const resDB = firebase.firestore().collection(`quizzes/${id}/results`)
        resDB.onSnapshot((querySnapshot) => {
            setPerc( querySnapshot.docs.map(doc => doc.data()) )
        })
    }

    useEffect(() => {
        getQuiz();
        getResults();
    }, [id])


    const [perc, setPerc] = useState([])

    let sum, classAverage;
    sum = perc.reduce((cum, curr) => cum+curr.result, 0)
    classAverage = sum / perc.length
    console.log(perc.length)
    // console.log(`Class average is ${classAverage}`)

    // WHEN CALCULATING PERCENTILE, USE <= yourScore... also, include count of # of people with the same scores
    let belowYourScore = perc.filter( (obj) => obj.result <= score )
    let percentile = belowYourScore.length / perc.length * 100

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


    if (finalScore && !hasSavedScore) {
        saveResult();
        setHasSavedScore(true);
    }


    return (
        <div className="container">
            <div className="viewquiz-app">
                {finalScore ? (
                    <div className="card amber z-depth-3 center">
                        <div className="card-content center"><h5>Your final score is {score} / {allQuestions.length}</h5></div>
                        <div>Class average score on this quiz is <strong><em>{classAverage}</em></strong></div>
                        <div>You are in the <strong><em>{percentile}th</em></strong> percentile</div>
                        <div>A total number of {perc.length} people have taken this quiz</div>
                        <div>Add number of people that had the same score as you</div>

                        <div className="chart">
                            <Chart 
                            classAverage={classAverage}
                            score={score}
                            nQuestions={allQuestions.length}
                            />
                        </div>
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
            </div>

        </div>
        )
}

export default ViewQuiz;