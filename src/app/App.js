import React from 'react';
import Header from './Header/Header';
import * as firebase from 'firebase';
import './App.css';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header {...this.state}/>
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

export default App;
