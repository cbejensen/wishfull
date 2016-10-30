import React from 'react';
import { Button } from 'react-bootstrap';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';

class EditWishBtn extends React.Component {
  editWish() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const path = `${user.uid}/wish-form/${this.props.id}`;
        browserHistory.push(path);
      } else {
        browserHistory.push('sign-in')
      }
    });
  }
  render() {
    return <Button>Edit</Button>
  }
}

export default EditWishBtn;
