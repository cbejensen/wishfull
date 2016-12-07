import React from 'react';
import { Image } from 'react-bootstrap';
import './index.css';

class Avatar extends React.Component {
  render() {
    return (
      <Image src={this.props.img}
        className="User-img"
        circle />
    )
  }
};

export default Avatar;
