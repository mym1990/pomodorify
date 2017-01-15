import React from 'react';
import './App.css';
import Focus from './components/Focus';
import Break from './components/Break';

class App extends React.Component {
    render() {
        return (
            <div className="countDown">
                <Focus />
                <Break />
            </div>
        )
    }
}

export default App;
