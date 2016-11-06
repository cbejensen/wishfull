import React from 'react';
import { browserHistory } from 'react-router';
import { Nav, NavItem } from 'react-bootstrap';
import * as firebase from 'firebase';
import { WishListContainer } from '../components/WishList';
import { FriendList } from '../components/FriendList';

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      activeTab: 1
    };
    this.handleTabSelect = this.handleTabSelect.bind(this);
  }
  componentDidMount() {
    this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user: user
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
  render() {
    if (!this.state.user) return null;
    let title, activeComponent;
    if (this.state.activeTab === 1) {
      title = 'Your Wish List';
      activeComponent = (
        <WishListContainer uid={this.state.user.uid} mutable={true} />
      )
    } else {
      title = 'Your Friends';
      activeComponent = (
        <FriendList uid={this.state.user.uid} />
      )
    }
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={this.state.activeTab}
          onSelect={this.handleTabSelect} justified >
          <NavItem eventKey={1}>My Wish List</NavItem>
          <NavItem eventKey={2}>My Friends</NavItem>
        </Nav>
        <div className="h1" style={{textAlign: 'center'}}>{title}</div>
        {activeComponent}
      </div>
    );
  }
}

export default HomeView;
