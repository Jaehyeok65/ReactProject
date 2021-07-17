import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App2.css';
import Booknav from './Book/Booknav';
import Novel from './Book/Novel';
import BookHeader from './Book/BookHeader';
import Home from './Book/Home';
import Webtoon from './Book/Webtoon';

class App2 extends Component {

    render() {

        return(
            <div>
            <Router>
            <BookHeader />
            <Booknav>
                <div>
                    <Route exact path="/" component = {Home} />
                    <Route exact path="/novel" component = {Novel} />
                    <Route exact path="/webtoon" component = {Webtoon} />
                </div>
                 </Booknav>
                 </Router>
            </div>
        );
    }

}


export default App2;