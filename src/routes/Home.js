import React from 'react';
import { browserHistory } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import { WishList } from '../components/WishList';

const HomeContainer = React.createClass({
  getInitialState() {
    return {
      uid: null
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          uid: user.uid
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
    if (!this.state.uid) return null;
    return <Home uid={this.state.uid}/>
  }
})

export function Home(props) {
  const path = `${props.uid}/new-wish`
  return (
    <div>
      <div className="h1" style={{textAlign: 'center'}}>Your Wish List</div>
      <WishList uid={props.uid} editing={true} />
    </div>
  );
}

export default HomeContainer;
