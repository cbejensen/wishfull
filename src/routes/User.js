import React from 'react';
import { browserHistory } from 'react-router';
import { getUser } from '../utils/firebaseHelpers';
import { WishListContainer } from '../components/WishList';
import * as firebase from 'firebase';

class UserView extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {user: null}
  }
  componentDidMount() {
    const uid = this.props.params.uid;
    firebase.auth().onAuthStateChanged(user => {
      if (user.uid === uid) {
        browserHistory.push('/home')
      }
    })
    getUser(uid).then(user => {
      this.setState({user: user})
    }, err => {
      console.log(err);
    })
  }
  componentWillUnmount() {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {});
    unsubscribe();
  }
  render() {
    if (!this.state.user) return <div>Loading...</div>;
    const name = this.state.user.firstName + ' ' + this.state.user.lastName;
    return (
      <div>
        <div className="h1" style={{textAlign: 'center'}}>{name}</div>
        <WishListContainer uid={this.props.params.uid} mutable={false} />
      </div>
    );
  }
}

export default UserView;
