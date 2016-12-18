import React from 'react';
import WishItem from './WishItem';
import { fulfillWish } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFulfilled: this.props.showFulfilled,
      highlighted: false,
      expanded: this.props.selected
    }
    this.handleFulfill = this.handleFulfill.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  handleMouseEnter() {
    this.setState({highlighted: true})
  }
  handleMouseLeave() {
    this.setState({highlighted: false})
  }
  handleFulfill() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.id, user.uid)
        .then(res => {}, err => {
          console.log(err);
        })
      } else {
        alert('You must be signed in first!');
      }
    });
    removeAuthListener();
  }
  render() {
    let priorityColor;
    switch (this.props.item.priority) {
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
      case '10':
        priorityColor = 'rgb(255, 0, 0)';
        break;
      default:
        priorityColor = 'rgb(67, 67, 67)';
    }
    return <WishItem {...this.props}
      {...this.state}
      priorityColor={priorityColor}
      handleFulfill={this.handleFulfill}
      handleMouseEnter={this.handleMouseEnter}
      handleMouseLeave={this.handleMouseLeave} />
  }
};

export default WishItemContainer;
