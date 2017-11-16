import React from 'react';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';

export default function UserBoxBody(props) {
  // TODO: make this look a lot better and add wish count
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center'
    }
  };
  function goToUser(e) {
    e.stopPropagation();
    browserHistory.push(`users/${props.userId}`)
  }
  return (
    <div style={styles.container}>
      <Button bsSize="large" onClick={e => goToUser(e)}>Go to profile</Button>
    </div>
  );
}

UserBoxBody.propTypes = {
  userId: React.PropTypes.node.isRequired,
};
