import React from 'react'
import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyBHRh6k7zIW8q0xfGsGfmtq4U11p1FbS8I",
    authDomain: "timerapp-b5776.firebaseapp.com",
    databaseURL: "https://timerapp-b5776.firebaseio.com",
    storageBucket: "timerapp-b5776.appspot.com",
    messagingSenderId: "257859946785"
};

firebase.initializeApp(config);

let focusTimer = 1500;

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            currentValue: focusTimer,
            minutes: Math.floor(focusTimer/60),
            seconds: Math.floor(focusTimer%60),
            streak: 0
        };
    }
    onClickStart = () => {
        this.setState({ isStart: true });
        let timer = setInterval(() => {
            if(this.state.isStart === true && this.state.currentValue > 0) {
                this.state.currentValue--;
            }
            this.setState({minutes: parseInt(this.state.currentValue / 60, 10)});
            this.setState({seconds: parseInt(this.state.currentValue % 60, 10)});

            if (this.state.currentValue === 0) {
                clearInterval(timer);
                this.setState({currentValue: focusTimer });
            }
        }, 1000);
    };

    onPause = () => {
        this.setState({isStart: false});
    };

    doSomething = (time) => {
        this.setState({currentValue: time});
        this.setState({minutes: parseInt(this.state.currentValue / 60, 10)});
        this.setState({seconds: parseInt(this.state.currentValue % 60, 10)});
    };

    render() {
        return (
            <div className="countDown">
                <button onClick={() => this.doSomething(900)}>15</button>
                <button onClick={() => this.doSomething(1200)}>20</button>
                <button onClick={() => this.doSomething(1500)}>25</button>
                <h3>Focus</h3>
                <div className="timer">{this.state.minutes}:{this.state.seconds}</div>
                <button onClick={this.onClickStart}>Start</button>
                <button onClick={this.onPause}>Pause</button>
            </div>
        )
    }
}

export default Focus;