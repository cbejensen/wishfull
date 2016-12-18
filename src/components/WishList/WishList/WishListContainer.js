import React from 'react';
import WishList from './WishList';
import * as firebase from 'firebase';

class WishListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      filter: '',
      items: 'loading',
      showFulfilled: false,
      selectedWish: -1
    }
    this.handleSelectWish = this.handleSelectWish.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  componentDidMount() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user && user.uid !== this.props.uid) {
        this.setState({
          showFulfilled: true
        })
      }
    })
    removeAuthListener();
    const path = `lists/${this.props.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.on('value', snap => {
      this.setState({
        items: snap.val(),
      })
    });
  }
  componentWillUnmount() {
    const path = `lists/${this.props.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.off();
  }
  handleSelectWish(wishIndex) {
    if (wishIndex === this.state.selectedWish) {
      // if user deselects wish already selected
      this.setState({selectedWish: -1})
    } else {
      this.setState({selectedWish: wishIndex})
    }
  }
  handleSearchChange(e) {
    this.setState({search: e.target.value});
  }
  handleFilterChange(e) {
    this.setState({filter: e.target.value});
  }
  render() {
    if (this.state.items === 'loading') return (
      <div style={{textAlign: 'center'}}>Loading...</div>
    )
    if (!this.state.items) {
      return (
        <div style={{textAlign: 'center'}}>
          <h3>No wishes yet!</h3>
          {this.state.showFulfilled ? null : <AddWishBtn uid={this.props.uid} />}
        </div>
      )
    }
    return <WishList {...this.state}
      handleSelectWish={this.handleSelectWish}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      uid={this.props.uid}
      mutable={this.props.mutable} />
  }
};

export default WishListContainer;
