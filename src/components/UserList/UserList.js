import React from 'react';
import { getFriends } from '../../utils/firebaseHelpers';
import User from './User';

class UserList extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.users).map(id => {
          return (
            <User key={id} id={id} />
          )
        })}
      </div>
    )
  }
};

export default UserList;
