import React from 'react'
import NavBar from './NavBar'
import NavMenu from './NavMenu'
import NavSearch from './NavSearch'
import {Link, browserHistory} from 'react-router'
import {Grid} from 'react-bootstrap'
import './Nav.css'

export function Nav(props) {
  // let menu
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
  return (
    <div className="Nav-wrapper">
      <Grid className="Nav-container">
        <NavBar
          uid={props.uid}
          toggleMenu={props.toggleMenu}
          toggleSearch={props.toggleSearch} />
        {props.menuVisible && <NavMenu
          uid={props.uid}
          signOut={props.signOut}/>}
        {props.searchVisible && <NavSearch
          uid={props.uid} />}
      </Grid>
    </div>
  )
}

Nav.propTypes = {
  uid: React.PropTypes.node.isRequired,
  menuVisible: React.PropTypes.bool.isRequired,
  searchVisible: React.PropTypes.bool.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired,
  signOut: React.PropTypes.func.isRequired
}

export default Nav
