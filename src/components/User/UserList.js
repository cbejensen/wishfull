import React from 'react';
import UserHeading from './UserHeading';

const UserList = props => {
  return (
    <div>
      {props.users.map(user => {
        return (
          <UserHeading key={user.uid}
            user={user}
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
