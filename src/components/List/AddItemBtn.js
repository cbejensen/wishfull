import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export function AddItemBtn(props) {
  const path = `${props.uid}/wish-form`
  return (
    <Link to={path}>
      <Button>{props.text}</Button>
    </Link>
  );
}

export default AddItemBtn;
