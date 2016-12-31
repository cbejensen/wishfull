import React from 'react';
import UserHeading from './UserHeading';

const UserList = props => {
  return (
    <div>
      {props.users.map(user => {
        return (
          <UserHeading key={user.uid}
            uid={user.uid}
            name={user.firstName + ' ' + user.lastName}
            handleClickUser={props.handleClickUser.bind(null, user.uid)}/>
        )
      })}
    </div>
  )
};

UserList.propTypes = {
  users: React.PropTypes.array.isRequired
}

export default UserList;
