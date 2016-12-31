import React from 'react';
import Avatar from './Avatar';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
import './UserHeading.css';

const UserHeading = props => {
  return (
    <Row className="UserHeading-row"
      onClick={props.handleClickUser}>
      <Col xs={4} sm={3} className="UserHeading-img-col">
        <Avatar uid={props.uid} />
      </Col>
      <Col xs={8} sm={9} className="UserHeading-name-col">
        <div>{props.name}</div>
      </Col>
    </Row>
  )
};

UserHeading.propTypes = {
  name: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default UserHeading;
