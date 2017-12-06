import React from 'react';
import { Avatar } from 'components/User/Avatar';
import { ToggleFriend } from 'components/ToggleFriend';
import { Link } from 'react-router';
import { Button, Glyphicon } from 'react-bootstrap';

export default function UserBoxHeader(props) {
  const dark = props.luminosity === 'dark' || !props.luminosity;
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      marginRight: '20px'
    },
    main: {
      flex: 1,
      overflow: 'hidden'
    },
    name: {
      color: dark ? '#1c1c1c' : '#ffffff',
      fontSize: '2.5rem',
      fontWeight: 'bolder',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    profileBtn: {
      marginLeft: '8px',
      background: dark ? '#ffffff' : '#1c1c1c',
      color: dark ? '#1c1c1c' : '#ffffff'
    }
  };
  return (
    <div style={styles.container}>
      <Avatar uid={props.userId} style={styles.avatar} size="65px" />
      <div style={styles.main}>
        <div style={styles.name}>{props.name}</div>
        {props.uid && (
          <ToggleFriend
            uid={props.uid}
            friendId={props.userId}
            handleToggle={e => e.stopPropagation()}
          />
        )}
        <Link to={`/users/${props.userId}`}>
          <Button bsSize="small" style={styles.profileBtn}>
            View Profile <Glyphicon glyph="new-window" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

UserBoxHeader.propTypes = {
  name: React.PropTypes.string.isRequired,
  userId: React.PropTypes.node.isRequired,
  uid: React.PropTypes.node,
  handleClick: React.PropTypes.func
};
