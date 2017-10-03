import React from 'react';
import WishForm from './WishForm';
import { browserHistory } from 'react-router';
import {
  addWish,
  updateWish,
  getWish,
  deleteWish
} from 'utils/firebaseHelpers';
import {
  validateWish,
  validatePrice as validatePriceHelper,
  validateUrl as validateUrlHelper
} from 'utils/validationHelpers';

class WishFormContainer extends React.Component {
  constructor(props) {
    super(props);
    // TODO: add security rules to encapsulate fulfilled
    this.state = {
      title: '',
      description: '',
      url: '',
      price: '',
      priority: 5
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateUrl = this.validateUrl.bind(this);
    this.validatePrice = this.validatePrice.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.wishId) {
      getWish(this.props.uid, this.props.wishId).then(
        wish => {
          this.setState({
            title: wish.title,
            description: wish.description,
            url: wish.url,
            price: wish.price.toString(),
            priority: wish.priority.toString()
          });
        },
        err => {
          browserHistory.push('/home');
        }
      );
    }
  }
  handleChange(field, e) {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  }
  validateUrl() {
    let url = this.state.url;
    if (url === '') return null;
    let verified = validateUrlHelper(url);
    return verified ? 'success' : 'error';
  }
  validatePrice() {
    let price = this.state.price;
    if (price === '') {
      return null;
    } else {
      let verified = validatePriceHelper(price);
      return verified ? 'success' : 'error';
    }
  }
  handleDelete(e) {
    deleteWish(this.props.uid, this.props.wishId);
    browserHistory.push('/home');
  }
  handleSubmit(e) {
    e.preventDefault();
    let wish = {
      title: this.state.title,
      description: this.state.description,
      url: this.state.url,
      price: this.state.price,
      priority: this.state.priority
    };
    if (wish.price) wish.price = parseInt(wish.price.replace(/,/g, ''), 10);
    wish.priority = parseInt(wish.priority, 10);
    validateWish(wish).then(
      res => {
        const onSuccess = res => browserHistory.push('/home');
        const onError = err =>
          alert(
            'There was an error processing your request. Please try again.'
          );
        if (!this.props.wishId) {
          addWish(wish, this.props.uid).then(onSuccess, onError);
        } else {
          updateWish(this.props.uid, this.props.wishId, wish).then(
            onSuccess,
            onError
          );
        }
      },
      err => {
        alert(err);
      }
    );
  }
  render() {
    return (
      <WishForm
        {...this.state}
        wishId={this.props.wishId}
        handleChange={this.handleChange}
        validateUrl={this.validateUrl}
        validatePrice={this.validatePrice}
        handleDelete={this.handleDelete}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default WishFormContainer;
