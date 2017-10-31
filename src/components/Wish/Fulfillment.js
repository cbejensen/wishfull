import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

export default function Fulfillment(props) {
  const fulfillWish = e => props.updateFulfilledStatus(!props.fulfillerId, e);
  const btn = (
    <Button
      bsStyle={props.fulfillerName ? 'danger' : 'primary'}
      onClick={fulfillWish}
    >
      {props.fulfillerName ? 'Unfulfill' : 'Fulfill'}
    </Button>
  );
  if (!props.fulfillerName) {
    return btn;
  } else if (props.fulfillerName === 'you') {
    return (
      <div>
        <div>Fullfilled by {props.fulfillerName}</div>
        <div>{btn}</div>
      </div>
    );
  } else {
    return (
      <div>
        Fulfilled by{' '}
        <Link onClick={props.openLink} to={`users/${props.fulfillerId}`}>
          {props.fulfillerName}
        </Link>
      </div>
    );
  }
}

Fulfillment.propTypes = {
  fulfillerName: React.PropTypes.node,
  fulfillerId: React.PropTypes.string,
  updateFulfilledStatus: React.PropTypes.func
};
