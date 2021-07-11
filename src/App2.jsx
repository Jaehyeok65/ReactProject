import React, { Component } from 'react';
import BookHeader from './Book/BookHeader';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App2.css';
import Booknav from './Book/Booknav';
import Home from './Book/Home';
import Random from './Book/Random';
import Ranking from './Book/Ranking';

class App2 extends Component {

    render() {


        return(
            <div>
            <BookHeader className = "head" />
            <Router>
            <Booknav>
                <div>
                    <Route exact path="/" component = {Home} />
                    <Route exact path="/random" component = {Random} />
                    <Route exact path="/ranking" component = {Ranking} />
                </div>
                 </Booknav>
                 </Router>
            </div>
        );
    }

}


export default App2;