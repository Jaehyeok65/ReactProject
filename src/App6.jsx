import React, {Component} from 'react';
import Joinmember from './Hompage/Joinmember';
import Login from './Hompage/Login';
import Navigation from './Hompage/Navigation';
import { HashRouter as Router, Route } from 'react-router-dom';
import Novel from './Hompage/Novel';
import Webtoon from './Hompage/Webtoon';
import Home from './Hompage/Home';



class App5 extends Component {


    render() {

        return (
            <div>
            <Router>
            <Navigation>
                <div>
                <Route exact path="/" component = {Home} />
                <Route exact path="/novel" component = {Novel} />
                <Route exact path="/webtoon" component = {Webtoon} />
                </div>
            </Navigation>
            <Joinmember />
            <Login />
            </Router>
            </div>
        );

    }
    
}


export default App5;