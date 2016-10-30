import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

class AddWishBtn extends React.Component {
  addWish() {
    const path = `${this.props.uid}/wish-form`;
    browserHistory.push(path);
  }
  render() {
    return <Button>Make New Wish</Button>
  }
}

export default AddWishBtn;
