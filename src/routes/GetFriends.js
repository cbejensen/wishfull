import React from 'react';
import { AllUsersList } from '../components/UserList';
import { Grid, Row, Col } from 'react-bootstrap';

class GetFriends extends React.Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <AllUsersList uid={this.props.params.uid}/>
          </Col>
        </Row>
      </Grid>
    )
  }
};

export default GetFriends;
