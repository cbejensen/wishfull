import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default function Fulfillment(props) {
  const fulfillWish = e => props.updateFulfilledStatus(!props.fulfiller, e);
  const btn = (
    <Button onClick={fulfillWish}>
      {props.fulfiller ? 'Unfulfill' : 'Fulfill'}
    </Button>
  );
  if (!props.fulfiller) {
    return btn;
  } else if (props.fulfiller === 'you') {
    return (
      <div>
        <div>Fullfilled by {props.fulfiller}</div>
        <div>{btn}</div>
      </div>
    );
  } else {
    return (
      <div>
        Fulfilled by{' '}
        <Link onClick={props.openLink} to={`users/${props.fulfillerId}`}>
          {props.fulfiller}
        </Link>
      </div>
    );
  }
}

Fulfillment.propTypes = {
  fulfiller: React.PropTypes.node,
  fulfillerId: React.PropTypes.string,
  updateFulfilledStatus: React.PropTypes.func
};
