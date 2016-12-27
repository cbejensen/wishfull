import React from 'react';
import { Search } from 'components/Search';
import { Link } from 'react-router';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as firebase from 'firebase';
import './Header.css';

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
  // let getFriendsPath;
  // let LoginOrOut;
  // if (props.user) {
  //   getFriendsPath = `/get-friends/${props.user.uid}`;
  //   LoginOrOut = (
  //     <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
  //   )
  // } else {
  //   getFriendsPath = `/sign-in`
  //   LoginOrOut = (
  //     <NavItem>Sign In</NavItem>
  //   )
  // };
  return (
    <div className="Header-container">
      <Grid>
        <Row>
          <Col xs={4} className="Header-col left">
            <div><Glyphicon glyph="menu-hamburger" /></div>
          </Col>
          <Col xs={4} className="Header-col center">
            <div><span>W</span></div>
          </Col>
          <Col xs={4} className="Header-col right">
            <div><Glyphicon glyph="search" /></div>
          </Col>
        </Row>
      </Grid>
    </div>
    // <div>
    //   <Navbar>
    //     <Navbar.Header>
    //       <Navbar.Brand>
    //         <Link to='/'>
    //           WISHFULL
    //         </Link>
    //       </Navbar.Brand>
    //       <Navbar.Toggle />
    //     </Navbar.Header>
    //     <Navbar.Collapse>
    //       <Nav>
    //         <LinkContainer to="/home">
    //           <NavItem>Home</NavItem>
    //         </LinkContainer>
    //         <LinkContainer to="/friends">
    //           <NavItem>Friends</NavItem>
    //         </LinkContainer>
    //         <LinkContainer to={getFriendsPath}>
    //           <NavItem>Get Some Friends</NavItem>
    //         </LinkContainer>
    //       </Nav>
    //       <Nav pullRight>
    //         <LinkContainer to="/sign-in">
    //           {LoginOrOut}
    //         </LinkContainer>
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    //   {props.user ? <Search uid={props.user.uid}/> : null}
    // </div>
  );
}

export default HeaderContainer;
