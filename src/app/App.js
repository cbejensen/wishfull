import React from 'react';
import Header from './Header/Header';
import * as firebase from 'firebase';
import './App.css';

const App = React.createClass({
  getInitialState() {
    return {
      user: {}
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    });
  },
  render() {
    return (
      <div>
        <Header {...this.state}/>
        {React.cloneElement(this.props.children, { user: this.state.user })}
      </div>
    )
  }
});

export default App;
