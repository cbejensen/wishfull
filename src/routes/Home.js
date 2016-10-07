import React from 'react';
import * as firebase from 'firebase';

import { WishList } from '../components/List'

const HomeContainer = React.createClass({
  getInitialState() {
    return {
      user: {}
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
        })
      } else {
        // TODO: go to sign-in page
      }
    });
  },
  render() {
    return <Home user={this.state.user}/>
  }
})

export function Home(props) {
  return (
    <div>
      <h1>{props.user.email}'s Wish List</h1>
      <WishList />
    </div>
  );
}

export default HomeContainer;
