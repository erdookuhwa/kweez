import React from 'react'
import { withRouter } from 'react-router-dom';


function QuizBlob(props) {
    
    const handleLink = () => {
        props.history.push(`/quiz/${props.id}`)
      }

    return (
        <div className="container" onClick={handleLink}>
            {/* row, col=s12 l6 */}
            <div className="">
                <div className="">  
                    <div className="card center amber">
                        <div className="card-content">
                            <span className="card-title">{props.title}</span>
                            <p className="grey-text text-darken-2">{props.description}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}


export default withRouter(QuizBlob);