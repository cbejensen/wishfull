import React from 'react';
import { Link } from 'react-router';
import './NavLink.css';

class NavLink extends React.Component {
  render() {
    return <Link {...this.props} activeClassName="active" />
  }
}

export default NavLink;
