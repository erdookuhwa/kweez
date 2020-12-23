import React, { useState, useEffect } from 'react'
import firebase from './firebase'
import QuizBlob from './QuizBlob'

function ListQuizzes(props) {

    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(false)

    // make reference call to db to get all saved quizzes
    const db = firebase.firestore().collection("quizzes");

    // function to get all quizzes in this collection
    function getQuizzes() {
        setLoading(true);
        db.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
                let combined = doc.data();
                combined.id = doc.id;
                items.push(combined);
            });
            setQuizzes(items);
            setLoading(false)
        })
    }

    useEffect(() => {
        getQuizzes();
    }, [])

    let quizEl = quizzes.map((quiz) => <QuizBlob {...quiz} />)

    return (
        <div>
            {quizEl}
        </div>
    )
}


export default ListQuizzes;