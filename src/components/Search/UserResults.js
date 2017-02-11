import React from 'react';
import {UserList} from 'components/User';

class UserResults extends React.Component {
  render() {
    if (!this.props.results) return null
    return <UserList
      users={this.props.results}
      nameColor='#ffffff' />
  }
};

export default UserResults;
