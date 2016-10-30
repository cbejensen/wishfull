import React from 'react';
import { browserHistory } from 'react-router';
// import { Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import { WishListContainer } from '../components/WishList';

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
      } else {
        browserHistory.push('sign-in')
      }
    });
  },
  // componentWillUnmount() {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(user);
  //   unsubscribe();
  // },
  // TODO: turn off listener
  render() {
    if (!this.state.user) return null;
    return <Home user={this.state.user}/>
  }
})

export function Home(props) {
  return (
    <div>
      <div className="h1" style={{textAlign: 'center'}}>Your Wish List</div>
      <WishListContainer uid={props.user.uid} mutable={true} />
    </div>
  );
}

export default HomeContainer;
