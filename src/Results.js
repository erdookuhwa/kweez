import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import firebase from './firebase'
import './App.css'


function Results(props) {

    let { id } = useParams()

    const [percentile, setPercentile] = useState([])


    function getResults() {
        const resDB = firebase.firestore().collection(`quizzes/${id}/results`)
        resDB.onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setPercentile(doc.data())
                console.log({percentile})
            })
        })
    }

    useEffect(() => {
        getResults();
    }, [id])

    let r = percentile.map((p) => <div> {p} </div>)

    return (
        <div className="container">
            <h3>Welcome to the results page!</h3>
            <p>{r}</p>
            <h4>Percentiles are {percentile[0]}</h4>
        </div>
    )
}

export default Results