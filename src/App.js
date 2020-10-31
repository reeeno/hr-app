import logo from './logo.svg';
import heart from './heart.svg';
import './App.css';
import React, { Component } from 'react';

const hr_api = 'http://192.168.1.123/status';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
    }
  }

  fetchData = () => {
    fetch(hr_api)
        .then(response => {
          if (!response.ok) {
            throw Error("Request failed")
          }
          return response
        })
        .then(d => d.json())
        .then(d => {
          this.setState(d);
        }, () => {
          this.setState({
            requestFailed: true
          });
        })
  }

  componentDidMount() {
    this.fetchData();
    setInterval(this.fetchData, 1000)
  }

  // TODO: Need to ensure one animation is completed before updating the pulsing speed
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={heart} className="Heart filter-react-blue" alt="Heart"
               style={ { animation: `heartbeat ${60/this.state.hr}s infinite` } }/>
          <p>
            Charging: { this.state.charging ? "True": "False" }
          </p>
          <p>
            Heart Rate: { this.state.hr }
          </p>
          <p>
            Last Updated: { this.state.last_updated }
          </p>
          </header>
        </div>
    );
  }
}

export default App;
