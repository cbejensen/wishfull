import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import Fulfillment from './Fulfillment';
import { getUser, updateFulfillment } from 'utils/firebaseHelpers';

class WishBodyBottom extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fufillerName: null
    };
  }
  componentDidMount() {
    if (!this.props.fulfilled) {
      this.setState({ fufillerName: false });
    } else if (this.props.fulfilled === this.props.uid) {
      // if signed in user is the one who fulfilled it
      this.setState({ fufillerName: 'you' });
    } else {
      getUser(this.props.fulfilled).then(
        user => {
          const name = `${user.firstName} ${user.lastName}`;
          this.setState({
            fufillerName: name
          });
        },
        err => {
          console.error(err);
        }
      );
    }
  }
  updateFulfilledStatus = (fulfill, e) => {
    this.setState({ fufillerName: null });
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
          if (fulfill) {
            this.setState({ fufillerName: 'you' });
          } else {
            this.setState({ fufillerName: false });
          }
          this.props.setBoxHeight();
        })
        .catch(err => {
          alert(
            'There was an error processing your request. Please try again later.'
          );
        });
    }
  };
  render() {
    let content;
    if (this.state.fufillerName === null) {
      content = <span>Loading...</span>;
    } else if (!this.props.uid) {
      content = (
        <span>
          Please <Link to="sign-in">sign in</Link> to fulfill or edit wishes
        </span>
      );
    } else if (this.props.uid && this.props.uid === this.props.userId) {
      // user signed in is owner of wish
      content = (
        <Link to={`users/${this.props.userId}/wish-form/${this.props.wishId}`}>
          <Button>Edit</Button>
        </Link>
      );
    } else {
      // user is signed in, but this is someone else's wish
      content = (
        <div style={{ color: this.props.color }}>
          <Fulfillment
            fulfillerName={this.state.fufillerName}
            fulfillerId={this.props.fulfilled}
            updateFulfilledStatus={this.updateFulfilledStatus}
            openLink={this.props.openLink}
          />
        </div>
      );
    }
    return <div style={{ textAlign: 'right' }}>{content}</div>;
  }
}

WishBodyBottom.propTypes = {
  wishId: React.PropTypes.string,
  userId: React.PropTypes.string,
  uid: React.PropTypes.node,
  fulfilled: React.PropTypes.string,
  handleFulfill: React.PropTypes.func,
  mutable: React.PropTypes.bool,
  setHeight: React.PropTypes.func,
  openLink: React.PropTypes.func,
  color: React.PropTypes.string,
  setBoxHeight: React.PropTypes.func
};

export default WishBodyBottom;
