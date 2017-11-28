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
    <Button
      onClick={e => props.handleClick(e)}
      bsStyle={props.isFriend ? 'info' : 'warning'}
      bsSize={props.size || 'small'}
      style={{ ...props.style }}
    >
      {props.isFriend ? 'Friends ' : 'Add Friend '}
      <Glyphicon glyph={props.isFriend ? 'ok' : 'plus'} />
    </Button>
  );
}

ToggleFriend.propTypes = {
  isFriend: React.PropTypes.bool.isRequired,
  handleClick: React.PropTypes.func.isRequired,
  size: React.PropTypes.string
};
