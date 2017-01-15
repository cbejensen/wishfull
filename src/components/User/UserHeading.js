import React from 'react';
import {Avatar} from './Avatar';

const UserHeading = props => {
  const styles = {
    name: {
      textAlign: 'center',
      fontSize: '2em'
    },
    avatar: {
      height: '60px',
      textAlign: 'center',
      marginBottom: '10px'
    }
  }
  const name = props.user.firstName + ' ' + props.user.lastName;
  return (
    <div>
      <div style={styles.name}>{name}</div>
      <div style={styles.avatar}>
        <Avatar uid={props.user.uid} />
      </div>
    </div>
  )
};

UserHeading.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default UserHeading;
