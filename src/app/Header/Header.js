import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import * as firebase from 'firebase';

const HeaderContainer = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  getInitialState() {
    return {
      user: this.props.user
    }
  },
  handleSignOut() {
    firebase.auth().signOut().then(() => {}, error => {
      console.log(error)
    });
  },
  render() {
    return <Header handleSignOut={this.handleSignOut}
      user={this.props.user} />
  }
});

export function Header(props) {
  let signInOrOut;
  if (props.user) {
    signInOrOut = (
      <LinkContainer to="/sign-in">
        <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
      </LinkContainer>
    );
  } else {
    signInOrOut = (
      <LinkContainer to="/sign-in">
        <NavItem>Sign In</NavItem>
      </LinkContainer>
    )
  };
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
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
          <LinkContainer to="/search">
            <NavItem>Search</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          {signInOrOut}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderContainer;
