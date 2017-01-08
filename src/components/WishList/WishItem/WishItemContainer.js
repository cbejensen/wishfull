import React from 'react';
import WishItem from './WishItem';
import { fulfillWish } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: ''
    }
    this.setHeight = this.setHeight.bind(this);
    this.openLink = this.openLink.bind(this);
    this.handleFulfill = this.handleFulfill.bind(this);
  }
  componentDidMount() {
    this.setHeight(this.props.selected);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      console.log('success')
      this.setHeight(nextProps.selected);
    }
  }
  setHeight(selected) {
    this.headerHeight = document.getElementById('WishItem-header-' + this.props.index).offsetHeight;
    let itemBoxHeight = this.headerHeight + 22; // itemBox's padding & border
    if (!selected) {
      this.setState({height: itemBoxHeight})
    } else { // wish is selected
      const bodyHeight = document.getElementById('WishItem-body-' + this.props.index).offsetHeight;
      this.setState({height: itemBoxHeight + bodyHeight})
    }
  }
  openLink(e) {
    e.stopPropagation();
  }
  handleFulfill() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.id, user.uid)
        .then(res => {}, err => {
          alert('There was an error processing your request. Please try again later.');
        })
      } else {
        alert('You must be signed in first!');
      }
    });
    removeAuthListener();
  }
  render() {
    let priorityColor;
    switch (this.props.wish.priority) {
      case 1:
        priorityColor = 'rgb(255, 245, 0)';
        break;
      case 2:
        priorityColor = 'rgb(255, 220, 0)';
        break;
      case 3:
        priorityColor = 'rgb(255, 200, 0)';
        break;
      case 4:
        priorityColor = 'rgb(255, 175, 0)';
        break;
      case 5:
        priorityColor = 'rgb(255, 150, 0)';
        break;
      case 6:
        priorityColor = 'rgb(255, 125, 0)';
        break;
      case 7:
        priorityColor = 'rgb(255, 100, 0)';
        break;
      case 8:
        priorityColor = 'rgb(255, 80, 0)';
        break;
      case 9:
        priorityColor = 'rgb(255, 50, 0)';
        break;
      case 10:
        priorityColor = 'rgb(255, 0, 0)';
        break;
      default:
        priorityColor = 'rgb(67, 67, 67)';
    }
    return <WishItem {...this.props}
      height={this.state.height}
      priorityColor={priorityColor}
      setHeight={this.setHeight}
      openLink={this.openLink}
      handleFulfill={this.handleFulfill} />
  }
};

export default WishItemContainer;
