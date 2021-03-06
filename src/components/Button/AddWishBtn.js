import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function AddWishBtn(props) {
  const path = `/users/${props.uid}/wish-form`;
  return (
    <Link to={path}>
      <Button bsStyle="primary" bsSize="large">
        Make A Wish
      </Button>
    </Link>
  );
}
