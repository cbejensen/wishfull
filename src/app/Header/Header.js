import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as firebase from 'firebase';

const HeaderContainer = React.createClass({
  getInitialState() {
    return {
      user: null
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    });
  },
  handleSignOut() {
    firebase.auth().signOut().then(() => {}, error => {
      console.log(error)
    });
  },
  render() {
    if (!this.state.user) return <Header user={null} />
    return <Header handleSignOut={this.handleSignOut}
      user={this.state.user} />
  }
});

export function Header(props) {
  let getFriendsPath;
  let LoginOrOut;
  if (props.user) {
    getFriendsPath = `/get-friends/${props.user.uid}`;
    LoginOrOut = (
      <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
    )
  } else {
    getFriendsPath = `/sign-in`
    LoginOrOut = (
      <NavItem>Sign In</NavItem>
    )
  };
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to='/'>
            WISHFULL
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/home">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/friends">
            <NavItem>Friends</NavItem>
          </LinkContainer>
          <LinkContainer to={getFriendsPath}>
            <NavItem>Get Some Friends</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to="/sign-in">
            {LoginOrOut}
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderContainer;
