import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import ListQuizzes from './ListQuizzes'
import NewQuiz from './NewQuiz'
import ViewQuiz from './ViewQuiz'
import AddQuestions from './AddQuestions'
import Results from './Results'
import './index'
import './App.css'

function Navbar() {

    return (
        <div>
            <nav>
                <div className="nav-wrapper teal">
                    <div className="container red">
                        <a href="/" class="brand-logo left-align">Kweez</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="/">Take Quiz</a></li>
                            <li><a href="/newquiz/:id/addquestions">Create Quiz</a></li>
                            <li><a href="quiz/:id/results">Results</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <BrowserRouter>
                <div className="app collection center">
                    <Switch>
                        <Route exact path="/">
                            <Link className="link" to="/newquiz"></Link>
                            <ListQuizzes className="listquizzes" />
                        </Route>

                        <Route path="/quiz/:id" >
                            <ViewQuiz />
                            <br />
                            <Link to="/" className="link"><em className="teal-text">Home</em></Link>
                        </Route>

                        <Route exact path="/newquiz">
                            <NewQuiz />
                            <br />
                            <Link to="/" className="link"><em className="teal-text">Cancel</em></Link>
                        </Route>

                        <Route exact path="/newquiz/:id/addquestions">
                            <AddQuestions />
                        </Route>

                        <Route exact path="/results">
                            <Results />
                        </Route>

                    </Switch>
                </div>
            </BrowserRouter>

        <div className="footer-fixed">
            <footer className="page-footer teal lighten-3" style={{position:"fixed", bottom: 0, left:0, width:"100%"}}>
                <div className="container center">
                    <div>&copy; 2020 Kweez App</div>
                </div>
            </footer>
        </div>
        

        </div>
    )
}

export default Navbar