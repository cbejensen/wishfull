import React from 'react'
import WishItem from './WishItem'
import { fulfillWish } from 'utils/firebaseHelpers'
import * as firebase from 'firebase'

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: ''
    }
    this.setHeight = this.setHeight.bind(this)
    this.changeHeight = this.changeHeight.bind(this)
    this.openLink = this.openLink.bind(this)
    this.handleFulfill = this.handleFulfill.bind(this)
  }
  componentDidMount() {
    this.changeHeight(this.props.selected)
    // console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.changeHeight(nextProps.selected)
    }
  }
  setHeight(type, height) {
    if (type === 'header') this.headerHeight = height
    if (type === 'body') this.bodyHeight = height
  }
  changeHeight(selected) {
    const itemBoxHeight = this.headerHeight + 22 // ItemBox's padding & border
    if (!selected) {
      this.setState({height: itemBoxHeight})
    } else { // wish is selected
      const bodyHeight = this.bodyHeight
      this.setState({height: itemBoxHeight + bodyHeight})
    }
  }
  openLink(e) {
    e.stopPropagation()
  }
  handleFulfill() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.wish.id, user.uid)
        .then(res => {}, err => {
          alert('There was an error processing your request. Please try again later.')
        })
      } else {
        alert('You must be signed in first!')
      }
    })
    removeAuthListener()
  }
  render() {
    let priorityColor
    switch (this.props.wish.priority) {
      case 1:
        priorityColor = 'rgb(255, 245, 0)'
        break
      case 2:
        priorityColor = 'rgb(255, 220, 0)'
        break
      case 3:
        priorityColor = 'rgb(255, 200, 0)'
        break
      case 4:
        priorityColor = 'rgb(255, 175, 0)'
        break
      case 5:
        priorityColor = 'rgb(255, 150, 0)'
        break
      case 6:
        priorityColor = 'rgb(255, 125, 0)'
        break
      case 7:
        priorityColor = 'rgb(255, 100, 0)'
        break
      case 8:
        priorityColor = 'rgb(255, 80, 0)'
        break
      case 9:
        priorityColor = 'rgb(255, 50, 0)'
        break
      case 10:
        priorityColor = 'rgb(255, 0, 0)'
        break
      default:
        priorityColor = 'rgb(67, 67, 67)'
    }
    return <WishItem {...this.props}
      height={this.state.height}
      priorityColor={priorityColor}
      openLink={this.openLink}
      setHeight={this.setHeight}
      handleFulfill={this.handleFulfill} />
  }
}

WishItemContainer.propTypes = {
  wish: React.PropTypes.object.isRequired,
  uid: React.PropTypes.node.isRequired,
  index: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  showFulfilled: React.PropTypes.bool,
  mutable: React.PropTypes.bool,
  handleSelectWish: React.PropTypes.func
}

export default WishItemContainer
