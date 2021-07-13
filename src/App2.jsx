import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App2.css';
import Booknav from './Book/Booknav';
import Home from './Book/Home';

class App2 extends Component {

    render() {

        return(
            <div>
            <Router>
            <Booknav>
                <div>
                    <Route exact path="/" component = {Home} />
                </div>
                 </Booknav>
                 </Router>
            </div>
        );
    }

}


export default App2;