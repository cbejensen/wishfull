import React from 'react';
import WishItem from './WishItem';
import { fulfillWish } from '../../utils/firebaseHelpers'
import * as firebase from 'firebase';
import './index.css'

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFulfilled: this.props.showFulfilled
    }
    this.handleFulfill = this.handleFulfill.bind(this);
  }
  handleFulfill() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.id, user.uid)
        .then(res => {}, err => {
          console.log(err);
        })
      } else {
        alert('You must be signed in first!');
      }
    });
    removeAuthListener();
  }
  render() {
    return <WishItem item={this.props.item}
      uid={this.props.uid}
      id={this.props.id}
      mutable={this.props.mutable}
      showFulfilled={this.state.showFulfilled}
      handleFulfill={this.handleFulfill}/>
  }
};

export default WishItemContainer;
