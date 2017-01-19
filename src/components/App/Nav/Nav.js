import React from 'react'
import { Search } from 'components/Search'
import { Link, browserHistory } from 'react-router'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as firebase from 'firebase'
import './Nav.css'

export function Nav(props) {
  const styles = {
    main: {
      height: '50px'
    },
    menu: {
      display: props.menuVisible ? 'inherit' : 'none'
    },
    search: {
      display: props.searchVisible ? 'inherit' : 'none'
    }
  }
  // let getFriendsPath
  // let LoginOrOut
  // if (props.user) {
  //   getFriendsPath = `/get-friends/${props.user.uid}`
  //   LoginOrOut = (
  //     <NavItem onClick={props.handleSignOut}>Sign Out</NavItem>
  //   )
  // } else {
  //   getFriendsPath = `/sign-in`
  //   LoginOrOut = (
  //     <NavItem>Sign In</NavItem>
  //   )
  // }
  const goTo = path => {
    props.toggleMenu()
    browserHistory.push(path)
  }
  return (
    <div className="Nav-wrapper">
      <Grid className="Nav-container">

        <Row className="Nav-main" style={styles.main}>
          <Col xs={4} className="Nav-col left">
            <Glyphicon glyph="menu-hamburger" onClick={props.toggleMenu}/>
          </Col>
          <Col xs={4} className="Nav-col center">
            <Link to={props.uid ? '/home' : '/'}>
              <span>W</span>
            </Link>
          </Col>
          <Col xs={4} className="Nav-col right">
            <Glyphicon glyph="search" onClick={props.toggleSearch}/>
          </Col>
        </Row>

        <Row className="Nav-menu" style={styles.menu}>
          <Col xs={12} sm={4}
            onClick={goTo.bind(null, '/home')}>
            My Profile
          </Col>
          <Col xs={12} sm={4}
            onClick={goTo.bind(null, '/friends')}>
            Friends
          </Col>
          <Col xs={12} sm={4}
            onClick={props.handleSignOut}>
            Sign Out
          </Col>
        </Row>

        <Row className="Nav-search" style={styles.search}>
          <Col xs={12}>
            <Search uid={props.uid}/>
          </Col>
        </Row>

      </Grid>
    </div>
  )
}

Nav.propTypes = {
  uid: React.PropTypes.string.isRequired,
  menuVisible: React.PropTypes.bool.isRequired,
  searchVisible: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
  handleSignOut: React.PropTypes.func.isRequired
}

export default Nav
