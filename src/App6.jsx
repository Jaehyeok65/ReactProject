import React, {Component} from 'react';
import Joinmember from './Hompage/Joinmember';
import Login from './Hompage/Login';
import Navigation from './Hompage/Navigation';



class App5 extends Component {


    render() {

        return (
            <div>
            <Navigation />
            <Joinmember />
            <Login />
            </div>
        );

    }
    
}


export default App5;