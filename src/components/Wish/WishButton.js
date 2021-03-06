import React from 'react'
import FulfillmentButton from './FulfillmentButton'
import { Link } from 'react-router'

const WishButton = props => {
  if (!props.uid) {
    // user not signed in
    return null
  } else if (props.uid === props.userId) {
    // user signed in is owner of wish
    const { userId, wishId, ...otherProps } = props
    return (
      <Link
        className="wish-action"
        to={`/users/${userId}/wish-form/${wishId}`}
        {...otherProps}
      >
        Edit
      </Link>
    )
  } else if (!props.fulfilled || props.fulfilled === props.uid) {
    // wish not fulfilled or fulfilled by signed in user
    return <FulfillmentButton {...props} />
  } else {
    // wish fulfilled by someone else
    return null
  }
}

WishButton.propTypes = {
  fulfilled: React.PropTypes.node,
  uid: React.PropTypes.node.isRequired,
  userId: React.PropTypes.node.isRequired,
  wishId: React.PropTypes.string.isRequired
}

export default WishButton
