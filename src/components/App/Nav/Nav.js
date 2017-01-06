import React from 'react';
import { Search } from 'components/Search';
import { Link } from 'react-router';
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as firebase from 'firebase';
import './Nav.css';

export function Nav(props) {
  const styles = {
    main: {
      height: '50px'
    },
    menu: {
      display: props.showMenu ? 'inherit' : 'none'
    },
    search: {
      display: props.showSearch ? 'inherit' : 'none'
    }
  }
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
    <div className="Nav-wrapper">
      <Grid className="Nav-container">

        <Row className="Nav-main" style={styles.main}>
          <Col xs={4} className="Nav-col left">
            <div><Glyphicon glyph="menu-hamburger" onClick={props.toggleMenu}/></div>
          </Col>
          <Col xs={4} className="Nav-col center">
            <div><Link to="/home"><span>W</span></Link></div>
          </Col>
          <Col xs={4} className="Nav-col right">
            <div><Glyphicon glyph="search" onClick={props.toggleSearch}/></div>
          </Col>
        </Row>

        <Row className="Nav-menu" style={styles.menu}>
          <Col xs={12} style={{color: 'white'}}>
            <Link to=""><span>My Profile</span></Link>
            <Link to="/friends"><span>Friends</span></Link>
            <Link to=""><span>Sign Out</span></Link>
          </Col>
        </Row>

        <Row className="Nav-search" style={styles.search}>
          <Col xs={12}>
            <Search uid={props.uid}/>
          </Col>
        </Row>

        <Row className="Nav-search-results">
          <Col></Col>
        </Row>

      </Grid>
    </div>
  );
}

Nav.propTypes = {
  uid: React.PropTypes.string.isRequired,
  showMenu: React.PropTypes.bool.isRequired,
  showSearch: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
  handleSignOut: React.PropTypes.func.isRequired
}

export default Nav;
