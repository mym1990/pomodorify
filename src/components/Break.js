import React from 'react'
import firebase from 'firebase'

let config = {
    apiKey: "AIzaSyBHRh6k7zIW8q0xfGsGfmtq4U11p1FbS8I",
    authDomain: "timerapp-b5776.firebaseapp.com",
    databaseURL: "https://timerapp-b5776.firebaseio.com",
    storageBucket: "timerapp-b5776.appspot.com",
    messagingSenderId: "257859946785"
};
firebase.initializeApp(config);
let breakTimer = 300;
const initialState = {
    isStart: false,
    currentValue: breakTimer,
    minutes: breakTimer/60,
    seconds: "00",
    buttonText: "Start"
};

let streak = 0;

class Break extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    componentWillMount(){
        setInterval(this.onClickStart, 1000)
    };

    writeUserData = (streak) => {
        firebase.database().ref(streak).set({
            streak: streak
        });
    };

    onClickStart = () => {
        if(this.state.isStart === true && this.state.currentValue > 0) {
            this.state.currentValue--;
            this.setState({minutes: parseInt(this.state.currentValue / 60, 10)});
            this.setState({seconds: parseInt(this.state.currentValue % 60, 10)});

            if(this.state.seconds < 10) {
                this.setState({seconds: '0' + this.state.currentValue % 60});
            }
        }

        if(this.state.currentValue === 0) {
            streak++;
        }
    };

    startSwitch = () => {
        this.setState({isStart: !this.state.isStart});
        this.state.isStart ? this.setState({buttonText: "Start"}) : this.setState({buttonText: "Pause"});
    };

    resetSwitch = () => {
        this.setState(initialState);
    }


    render() {
        return (
            <div className="countDown">
                <h3>Break</h3>
                <div className="timer">{this.state.minutes}:{this.state.seconds}</div>
                <button id="start" className="btn btn-info" onClick={this.startSwitch}>{this.state.buttonText}</button>
                <button className="btn btn-default" onClick={this.resetSwitch}>Reset</button>
                <div>
                    <h2>Streak: {streak}</h2>
                    <button className="btn btn-default" onClick={this.writeUserData(streak)}>Submit</button>
                </div>
            </div>
        )
    }
}

export default Break;
