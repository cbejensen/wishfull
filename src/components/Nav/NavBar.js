import React from 'react'
import {Glyphicon, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router'
import logo from 'images/logo.png'
import './Nav.css'

export default function NavBar(props) {
  return (
    <Row className="Nav-main">
      <Col xs={4} className="Nav-col left">
        <Glyphicon glyph="menu-hamburger" onClick={props.toggleMenu}/>
      </Col>
      <Col xs={4} className="Nav-col center">
        <Link to={props.uid ? '/home' : '/'}>
          <img src={logo} alt="W"/>
        </Link>
      </Col>
      <Col xs={4} className="Nav-col right">
        <Glyphicon glyph="search" onClick={props.toggleSearch}/>
      </Col>
    </Row>
  )
}

NavBar.propTypes = {
  uid: React.PropTypes.node.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
}
