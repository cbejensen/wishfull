import React from 'react';

export default function Avatar(props) {
  const url = `url("${props.url}")`;
  const size = props.size || '100px';
  const styles = {
    backgroundImage: url,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: size,
    width: size,
    borderRadius: '100%',
    overflow: 'hidden',
    cursor: props.mutable ? 'pointer' : 'default'
  };
  return <div onClick={props.onClick} style={{ ...styles, ...props.style }} />;
}

Avatar.propTypes = {
  url: React.PropTypes.string.isRequired,
  style: React.PropTypes.object,
  mutable: React.PropTypes.bool
};
