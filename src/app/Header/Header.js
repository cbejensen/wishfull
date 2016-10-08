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
      <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
    );
  } else {
    signInOrOut = (
      <NavItem>Sign In</NavItem>
    )
  };
  const homePath = `/${props.user.uid}`;
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
          <LinkContainer to={homePath}>
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to='/search'>
            <NavItem>Search</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer to='/sign-in'>
            {signInOrOut}
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HeaderContainer;
