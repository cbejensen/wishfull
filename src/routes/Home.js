import React from 'react';
import { browserHistory } from 'react-router';
import * as firebase from 'firebase';

import { WishList } from '../components/List'

const HomeContainer = React.createClass({
  getInitialState() {
    return {
      user: null
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        })
        console.log(this.state)
      } else {
        browserHistory.push('sign-in')
      }
    });
  },
  render() {
    if (!this.state.user) return null;
    return <Home user={this.state.user}/>
  }
})

export function Home(props) {
  return (
    <div>
      <h1>{props.user.email}'s Wish List</h1>
      <WishList user={props.user} />
    </div>
  );
}

export default HomeContainer;
