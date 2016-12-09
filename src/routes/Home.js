import React from 'react';
import { UserListItem } from '../components/User';
import { browserHistory } from 'react-router';
import { Nav, NavItem, Button } from 'react-bootstrap';
import { WishListContainer } from '../components/WishList';
import { getFile, uploadFile } from '../utils/firebaseHelpers';
import * as firebase from 'firebase';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      activeTab: 1,
      avatar: null,
      pendingAvatar: null,
      loading: false
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.handleAvatarSelect = this.handleAvatarSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getFile(`images/avatars/${user.uid}`).then(avatar => {
          this.setState({
            user: user,
            avatar: avatar
          })
        })
      } else {
        browserHistory.push('sign-in')
      }
    });
  }
  componentWillUnmount() {
    this.removeAuthListener();
  }
  handleTabSelect(e) {
    this.setState({
      activeTab: e
    })
  }
  handleAvatarSelect(e) {
    var img = e.target.files[0]
    this.setState({
      pendingAvatar: img
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.pendingAvatar) {
      this.setState({loading: 'Loading...'})
      const file = this.state.pendingAvatar;
      const path = `images/avatars/${this.state.user.uid}`;
      uploadFile(file, path).then(res => {
        alert('Success!');
        getFile(`images/avatars/${this.state.user.uid}`).then(avatar => {
          this.setState({
            avatar: avatar,
            loading: false
          })
        })
      }, err => {
        alert('There was an error. Please try again.')
        console.log(err)
      })
    } else {
      alert('Please choose a picture first')
    }
  }
  render() {
    const style = {
      textAlign: 'center',
      paddingTop: '10px'
    }
    if (!this.state.user) return null;
    let activeComponent;
    if (this.state.activeTab === 1) {
      activeComponent = (
        <WishListContainer uid={this.state.user.uid} mutable={true} />
      )
    } else {
      activeComponent = (
        <form onSubmit={this.handleSubmit} style={style}>
          <input type="file" onChange={this.handleAvatarSelect} />
          <Button bsStyle="primary" type="submit"
            style={{margin: '20px'}}>Submit</Button>
          {this.state.loading && this.state.loading}
          <UserListItem id={this.state.user.uid}/>
          Refresh page after submitting new avatar.
        </form>
      )
    }
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeTab}
          onSelect={this.handleTabSelect} justified >
          <NavItem eventKey={1}>My Wish List</NavItem>
          <NavItem eventKey={2}>Change Avatar</NavItem>
        </Nav>
        {activeComponent}
      </div>
    );
  }
}

export default HomeView;
