import React from 'react';
import UserHeading from './UserHeading';

const UserList = props => {
  const styles = {
    user: {
      margin: '5px auto'
    }
  }
  return (
    <div>
      {props.users.map(user => {
        return (
          <div key={user.uid} style={styles.user}>
            <UserHeading
              uid={user.uid}
              name={user.firstName + ' ' + user.lastName}
              nameColor={props.nameColor}
              handleClick={props.handleClick}/>
          </div>
        )
      })}
    </div>
  )
};

UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  nameColor: React.PropTypes.string,
  handleClick: React.PropTypes.array
}

export default UserList;
