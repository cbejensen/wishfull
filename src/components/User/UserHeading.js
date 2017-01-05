import React from 'react';
import Avatar from './Avatar';
import ItemBox from 'components/ItemBox';
import { getUser, getFile } from '../../utils/firebaseHelpers';
import { Row, Col } from 'react-bootstrap';
import './UserHeading.css';

const UserHeading = props => {
  return (
    <Row>
      <Col xs={12}>
        <ItemBox handleClick={props.handleClickUser}>
          <Row className="UserHeading-row">
            <Col xs={4} sm={3} className="UserHeading-img-col">
              <Avatar uid={props.uid} />
            </Col>
            <Col xs={8} sm={9} className="UserHeading-name-col">
              <div>{props.name}</div>
            </Col>
          </Row>
        </ItemBox>
      </Col>
    </Row>
  )
};

UserHeading.propTypes = {
  name: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default UserHeading;
