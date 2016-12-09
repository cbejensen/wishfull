import React from 'react';
import './index.css';

function Avatar(props) {
  const url = `url("${props.avatar}")`
  const style = {
    backgroundImage: url,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }
  return <div style={style} className="Avatar"></div>
};

export default Avatar;
