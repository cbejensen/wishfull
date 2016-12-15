import React from 'react';
import UserHeading from './UserHeading';

const UserList = props => {
  return (
    <div>
      {props.users.map(user => {
        const name = user.firstName + ' ' + user.lastName;
        return (
          <UserHeading key={user.uid}
            uid={user.uid}
            title={name}
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
