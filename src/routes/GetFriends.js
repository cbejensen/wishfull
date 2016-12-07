import React from 'react';
import { AllUsersList } from '../components/User';
import { Grid, Row, Col } from 'react-bootstrap';

class GetFriends extends React.Component {
  render() {
    return (
      <Grid>
        <AllUsersList uid={this.props.params.uid}/>
      </Grid>
    )
  }
};

export default GetFriends;
