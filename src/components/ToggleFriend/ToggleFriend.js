import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default function ToggleFriend(props) {
  let status;
  if (props.isFriend) {
    status = <Glyphicon glyph="ok" />;
  } else {
    status = <Glyphicon glyph="plus" />;
  }
  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <Button
        onClick={e => props.handleClick(e)}
        bsStyle={props.isFriend ? 'info' : 'warning'}
      >
        {props.isFriend ? 'Friends ' : 'Add Friend '}{status}
      </Button>
    </div>
  );
}

ToggleFriend.propTypes = {
  isFriend: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired
};
