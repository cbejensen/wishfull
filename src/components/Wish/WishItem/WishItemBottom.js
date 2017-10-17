import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Fulfillment from './Fulfillment';
import { getUser, updateFulfillment } from 'utils/firebaseHelpers';

class WishItemBottom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fulfilled: null
    };
  }
  componentDidMount() {
    if (!this.props.fulfilled) {
      this.setState({ fulfilled: false });
    } else if (this.props.fulfilled === this.props.uid) {
      // if signed in user is the one who fulfilled it
      this.setState({ fulfilled: 'you' });
    } else {
      getUser(this.props.fulfilled).then(
        user => {
          const name = `${user.firstName} ${user.lastName}`;
          this.setState({
            fulfilled: name
          });
        },
        err => {
          console.log(err);
        }
      );
    }
  }
  updateFulfilledStatus = (fulfill, e) => {
    this.setState({ fulfilled: null });
    // if fulfill is false, unfulfill the wish
    e.stopPropagation();
    updateFulfillment(
      this.props.userId,
      this.props.wishId,
      this.props.uid,
      fulfill
    )
      .then(res => {
        if (fulfill) {
          this.setState({ fulfilled: 'you' });
        } else {
          this.setState({ fulfilled: false });
        }
        this.props.setHeight();
      })
      .catch(err => {
        alert(
          'There was an error processing your request. Please try again later.'
        );
      });
  };
  render() {
    let content;
    if (this.state.fulfilled === null) {
      content = <span>'Loading...'</span>;
    } else if (!this.props.uid) {
      content = (
        <span>
          Please <Link to="sign-in">sign in</Link> to fulfill or edit wishes
        </span>
      );
    } else if (this.props.mutable) {
      // user signed in is owner of wish
      content = (
        <Link to={`users/${this.props.userId}/wish-form/${this.props.wishId}`}>
          <Button>Edit</Button>
        </Link>
      );
    } else {
      // user is signed in, but this is someone else's wish
      content = (
        <div style={{ textAlign: 'right', color: this.props.priorityColor }}>
          <Fulfillment
            fulfiller={this.state.fulfilled}
            updateFulfilledStatus={this.updateFulfilledStatus}
          />
        </div>
      );
    }
    return <div style={{ textAlign: 'right' }}>{content}</div>;
  }
}

WishItemBottom.propTypes = {
  wishId: React.PropTypes.string,
  userId: React.PropTypes.string,
  fulfilled: React.PropTypes.string,
  handleFulfill: React.PropTypes.func,
  priorityColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  setHeight: React.PropTypes.func
};

export default WishItemBottom;
