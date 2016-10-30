import React from 'react';
import Header from './Header/Header';
import './App.css';

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
});

export default App;
