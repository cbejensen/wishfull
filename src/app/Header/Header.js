import React from 'react';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import * as firebase from 'firebase';

const HeaderContainer = React.createClass({
  getInitialState() {
    return {
      user: null,
      ready: false
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user,
        ready: true
      })
    });
  },
  componentWillUnmount() {
    firebase.auth().off();
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
  let signInOrOut;
  let homePath;
  if (props.user) {
    signInOrOut = (
      <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
    );
    homePath = `/${props.user.uid}`;
  } else {
    signInOrOut = (
      <NavItem>Sign In</NavItem>
    )
    homePath = '/sign-in';
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
