import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { updateFulfillment } from 'utils/firebaseHelpers';

class FulfillmentButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  updateFulfilledStatus = (fulfill, e) => {
    this.setState({ loading: true });
    e.stopPropagation();
    // if fulfill is false, unfulfill the wish
    // but if true, ask for price paid
    let price;
    if (fulfill) {
      // TODO: validate price
      price = prompt('How much did you pay for this item? (No dollar sign)');
    }
    if (fulfill && !price) {
      // if user tried to fulfill without setting price
      return;
    } else {
      updateFulfillment(
        this.props.userId,
        this.props.wishId,
        this.props.uid,
        fulfill,
        price
      )
        .then(res => {
          // this.setState({loading: false})
        })
        .catch(err => {
          alert(
            'There was an error processing your request. Please try again later.'
          );
        });
    }
  };
  render() {
    return (
      <Button
        bsStyle={this.props.fulfilled ? 'danger' : 'primary'}
        onClick={e => this.updateFulfilledStatus(!this.props.fulfilled, e)}
      >
        {this.props.fulfilled ? 'Unfulfill' : 'Fulfill'}
      </Button>
    );
  }
}

FulfillmentButton.propTypes = {
  fulfilled: React.PropTypes.node,
  uid: React.PropTypes.node,
  userId: React.PropTypes.node.isRequired
};

export default FulfillmentButton;
