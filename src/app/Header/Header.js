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
      signedIn: (null !== firebase.auth().currentUser)
    }
  },
  componentWillMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        signedIn: (null !== user)
      })
      if (user) {
        console.log('Signed In');
      } else {
        console.log('Not Signed In');
      }
    });
  },
  handleSignOut() {
    firebase.auth().signOut().then(() => {
      console.log('success')
    }, error => {
      console.log(error)
    });
  },
  render() {
    return <Header signedIn={this.state.signedIn}
    signOut={this.handleSignOut}/>
  }
});

export function Header(props) {
  let signInOrOut;
  if (props.signedIn) {
    signInOrOut = (
      <LinkContainer to="/">
        <NavItem onClick={props.signOut}>Sign Out</NavItem>
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
            <img src="" alt="WISHFULL"/>
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
