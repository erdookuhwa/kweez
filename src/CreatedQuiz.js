import React from 'react'
import { withRouter } from 'react-router-dom'

function CreatedQuiz(props) {

    const handleLink = () => {
        props.history.push(`quiz/${props.id}`)
    }


    return (
        <div className="container" onClick={handleLink}>
            <h2>Quiz has been created</h2>
        </div>
    )
}

export default CreatedQuiz