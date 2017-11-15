import React from 'react';
import { Avatar } from 'components/User/Avatar';
import {ToggleFriend} from 'components/ToggleFriend';

export default function UserBoxHeader(props) {
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      marginRight: '20px'
    },
    middle: {
      flex: 1,
      overflow: 'hidden'
    },
    name: {
      fontSize: '3rem',
      fontWeight: 'bolder',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    // subname: {
    //   fontSize: '1.5rem'
    // },
    friend: {
      marginLeft: '0 10px'
    }
  };
  return (
    <div style={styles.container}>
      <Avatar uid={props.userId} style={styles.avatar} size="75px" />
      <div style={styles.middle}>
        <div style={styles.name}>{props.name}</div>
      </div>
      {props.uid && (
        <div style={styles.friend}>
          <ToggleFriend uid={props.uid} friendId={props.userId} handleToggle={e => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

UserBoxHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  userId: React.PropTypes.node.isRequired,
  uid: React.PropTypes.node,
  handleClick: React.PropTypes.func
};
