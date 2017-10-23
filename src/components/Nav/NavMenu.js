import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import './Nav.css';

export default function NavMenu(props) {
  if (!props.uid) {
    return (
      <Row className="Nav-menu">
        <Col xs={12} onClick={() => browserHistory.push('/sign-in')}>
          Sign In
        </Col>
      </Row>
    );
  } else {
    return (
      <Row className="Nav-menu">
        <Col xs={12} md={3} onClick={() => browserHistory.push('/home')}>
          Home
        </Col>
        <Col xs={12} md={3} onClick={() => browserHistory.push('/friends')}>
          Friends
        </Col>
        <Col
          xs={12}
          md={3}
          onClick={() => browserHistory.push('/fulfilled-wishes')}
        >
          My Fulfillments
        </Col>
        <Col xs={12} md={3} onClick={props.signOut}>
          Sign Out
        </Col>
      </Row>
    );
  }
}

NavMenu.propTypes = {
  uid: React.PropTypes.node.isRequired,
  signOut: React.PropTypes.func.isRequired
};
