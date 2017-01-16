import React from 'react'

let breakTimer = 1500;
const initialState = {
    isStart: false,
    currentValue: breakTimer,
    minutes: breakTimer/60,
    seconds: "00",
    streak: 0,
    buttonText: "Start"
};

class Focus extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    };

    componentWillMount(){
        setInterval(this.onClickStart, 1000)
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
                <h3>Focus</h3>
                <div className="timer">{this.state.minutes}:{this.state.seconds}</div>
                <button id="start" className="btn btn-info" onClick={this.startSwitch}>{this.state.buttonText}</button>
                <button className="btn btn-default" onClick={this.resetSwitch}>Reset</button>
            </div>
        )
    }
}

export default Focus;
