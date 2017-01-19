import React from 'react'
import WishList from './WishList'
import * as firebase from 'firebase'

class WishListContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wishes: 'loading',
      selectedWish: -1
    }
    this.handleSelectWish = this.handleSelectWish.bind(this)
  }
  componentDidMount() {
    const path = `lists/${this.props.uid}`
    this.wishRef = firebase.database().ref(path)
    this.wishRef.on('value', snap => {
      let wishesObj = snap.val()
      let wishesArray = []
      for (var key in wishesObj) {
        wishesObj[key].id = key
        wishesArray.push(wishesObj[key])
      }
      this.setState({
        wishes: wishesArray,
      })
    })
  }
  componentWillUnmount() {
    this.wishRef.off()
  }
  handleSelectWish(wishIndex) {
    if (wishIndex === this.state.selectedWish) {
      // if user deselects wish already selected
      this.setState({selectedWish: -1})
    } else {
      this.setState({selectedWish: wishIndex})
    }
  }
  render() {
    if (this.state.wishes === 'loading') return (
      <div style={{textAlign: 'center'}}>Loading...</div>
    )
    if (!this.state.wishes) {
      return (
        <div style={{textAlign: 'center'}}>
          <h3>No wishes yet!</h3>
          {this.state.showFulfilled ? null : <AddWishBtn uid={this.props.uid} />}
        </div>
      )
    }
    const mutable = this.props.mutable ? this.props.mutable : false
    const showFulfilled = this.props.showFulfilled ? this.props.showFulfilled : false
    return <WishList
      {...this.state}
      handleSelectWish={this.handleSelectWish}
      uid={this.props.uid}
      mutable={mutable}
      showFulfilled={showFulfilled} />
  }
}

WishListContainer.propTypes = {
  uid: React.PropTypes.string.isRequired,
  mutable: React.PropTypes.bool,
  showFulfilled: React.PropTypes.bool
}

export default WishListContainer
