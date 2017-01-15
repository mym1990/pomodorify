import React from 'react'

const breakTimer = 300;
class Break extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isStart: false,
            currentValue: breakTimer,
            minutes: Math.floor(breakTimer/60),
            seconds: Math.floor(breakTimer%60),
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
                this.setState({currentValue: breakTimer });
                this.setState({streak: this.state.streak + 1})
            }
        }, 1000);
    };

    onPause = () => {
        this.setState({isStart: false});
    }


    render() {
        return (
            <div className="countDown">
                <h3>Break</h3>
                <div className="timer">{this.state.minutes}:{this.state.seconds}</div>
                <button onClick={this.onClickStart}>Start</button>
                <button onClick={this.onPause}>Pause</button>
                <div>
                    <h2>Streak: {this.state.streak}</h2>
                </div>
            </div>
        )
    }
}

export default Break;