import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';

export default function EditWishBtn(props) {
  const path = `users/${props.uid}/wish-form/${props.id}`;
  return (
    <Link to={path}>
      <Button>
        Edit
      </Button>
    </Link>
  )
}
