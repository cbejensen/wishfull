import React from 'react';
import Avatar from './Avatar';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
import './UserHeading.css';

const UserHeading = props => {
  const name = props.user.firstName + ' ' + props.user.lastName;
  return (
    <Row className="UserHeading-row"
      onClick={props.handleClickUser}>
      <Col xs={4} sm={3} className="UserHeading-img-col">
        <Avatar uid={props.user.uid} />
      </Col>
      <Col xs={8} sm={9} className="UserHeading-name-col">
        <div>{name}</div>
      </Col>
    </Row>
  )
};

UserHeading.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default UserHeading;
