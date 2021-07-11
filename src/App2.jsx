import React, { Component } from 'react';
import BookHeader from './Book/BookHeader';
import './App2.css';
import Booknav from './Book/Booknav';

class App2 extends Component {

    render() {


        return(
            <div>
            <BookHeader className = "head" />
            <Booknav />
            </div>
        );
    }

}


export default App2;