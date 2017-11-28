import React from 'react';
import { Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

export default function UserBoxBody(props) {
  // TODO: make this look a lot better and add wish count
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center'
    },
    bio: {
      color: props.luminosity === 'dark' ? '#1c1c1c' : '#ffffff'
    }
  };
  function goToUser(e) {
    e.stopPropagation();
    browserHistory.push(`users/${props.userId}`);
  }
  return (
    <div style={styles.container}>
      <hr />
      <p style={styles.bio}>{props.bio || 'No bio'}</p>
    </div>
  );
}

UserBoxBody.propTypes = {
  userId: React.PropTypes.node.isRequired,
  bio: React.PropTypes.string
};
