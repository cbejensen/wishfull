import React from 'react';
import FulfillmentButton from './FulfillmentButton';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';

const WishButton = props => {
  if (!props.uid) {
    // user not signed in
    return null;
  } else if (props.uid === props.userId) {
    // user signed in is owner of wish
    return (
      <Link to={`/users/${props.userId}/wish-form/${props.wishId}`}>
        <Button>Edit</Button>
      </Link>
    );
  } else if (!props.fulfilled || props.fulfilled === props.uid) {
    // wish not fulfilled or fulfilled by signed in user
    return <FulfillmentButton {...props} />;
  } else {
    // wish fulfilled by someone else
    return null;
  }
};

WishButton.propTypes = {
  fulfilled: React.PropTypes.node,
  uid: React.PropTypes.node.isRequired,
  userId: React.PropTypes.node.isRequired,
  wishId: React.PropTypes.string.isRequired
};

export default WishButton;
