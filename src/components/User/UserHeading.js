import React from 'react';
import Avatar from './Avatar';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
import './UserHeading.css';

const UserItem = props => {
  return (
    <Row className="UserHeading-row"
      onClick={props.handleClickUser}>
      <Col xs={4} sm={3} className="UserHeading-img-col">
        <Avatar uid={props.uid} />
      </Col>
      <Col xs={8} sm={9} className="UserHeading-name-col">
        <div>{props.title}</div>
      </Col>
    </Row>
  )
};

UserItem.propTypes = {
  uid: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
}

export default UserItem;
