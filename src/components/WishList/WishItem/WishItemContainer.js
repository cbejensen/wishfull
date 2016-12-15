import React from 'react';
import WishItem from './WishItem';
import { fulfillWish } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

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
    let props = this.props;
    return <WishItem item={props.item}
      uid={props.uid}
      id={props.id}
      index={props.index}
      mutable={props.mutable}
      showFulfilled={this.state.showFulfilled}
      handleFulfill={this.handleFulfill} />
  }
};

export default WishItemContainer;
