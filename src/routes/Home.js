import React from 'react';
import * as firebase from 'firebase';

import WishList from '../components/WishList/WishList'

function getUser() {
  const userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(snapshot => {
    return snapshot.val();
  });
}

const HomeContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState() {
    return {
      user: {}
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUser().then(userInfo => {
          console.log(this)
          this.setState({
            user: userInfo
          })
        });
      } else {
        this.context.router.push('/')
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
      <h1>{props.user.name}'s Wish List</h1>
      <WishList />
    </div>
  );
}

export default HomeContainer;
