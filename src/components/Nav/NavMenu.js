import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import './Nav.css'

export default function NavMenu(props) {
  if (!props.uid) {
    return (
      <Row className="Nav-menu">
        <Col xs={12} sm={6}
          onClick={() => browserHistory.push('/sign-in')}>
          Sign In
        </Col>
        <Col xs={12} sm={6}
          onClick={() => browserHistory.push('/')}>
          Find Friends
        </Col>
      </Row>
    )
  } else {
    return (
      <Row className="Nav-menu">
        <Col xs={12} sm={4}
          onClick={() => browserHistory.push('/home')}>
          My Profile
        </Col>
        <Col xs={12} sm={4}
          onClick={() => browserHistory.push('/friends')}>
          Friends
        </Col>
        <Col xs={12} sm={4}
          onClick={props.signOut}>
          Sign Out
        </Col>
      </Row>
    )
  }
}

NavMenu.propTypes = {
  uid: React.PropTypes.node.isRequired,
  signOut: React.PropTypes.func.isRequired
}
