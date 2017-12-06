import React from 'react';
import { Link } from 'react-router';
import { Button } from 'react-bootstrap';
import { getUser } from 'utils/firebaseHelpers';
import './WishItem.css';

class FulfillmentStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null
    };
  }
  componentDidMount() {
    if (this.props.fulfillerId === this.props.uid) {
      // if signed in user is the one who fulfilled it
      this.setState({ name: 'you' });
    } else {
      getUser(this.props.fulfillerId).then(
        user => {
          const name = `${user.firstName} ${user.lastName}`;
          this.setState({
            name
          });
        },
        err => {
          console.error(err);
        }
      );
    }
  }
  componentDidUpdate() {}
  render() {
    let content;
    if (this.state.name === null) {
      return null;
    } else {
      return (
        <span>
          Fulfilled by{' '}
          <Link
            onClick={this.props.openLink}
            to={`/users/${this.props.fulfillerId}`}
          >
            <button className="WishItem-button">{this.state.name}</button>
          </Link>
        </span>
      );
    }
  }
}

FulfillmentStatus.propTypes = {
  fulfillerId: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
};

export default FulfillmentStatus;
