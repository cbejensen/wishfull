import React from 'react';
// import { Search } from 'components/Search';
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
    return <Header {...this.props} handleSignOut={this.handleSignOut}
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
            <div>
              <Glyphicon glyph="menu-hamburger"
                onClick={props.toggleMenu} />
            </div>
          </Col>
          <Col xs={4} className="Header-col center">
            <div><span>W</span></div>
          </Col>
          <Col xs={4} className="Header-col right">
            <div>
              <Glyphicon glyph="search"
                onClick={props.toggleSearch} />
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default HeaderContainer;
