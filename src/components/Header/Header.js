import React from 'react';
import { Link } from 'react-router'
import NavLink from '../NavLink/NavLink'

export function Header(props) {
  return (
    <div>
      <Link to="/">
        <img src="" alt="WISHFULL"/>
      </Link>
      <nav role="navigation">
        <NavLink to="/home">Home</NavLink>
        {/* <NavLink to="/find-a-friend">Find A Friend</NavLink>
        <NavLink to="/about">About</NavLink> */}
      </nav>
    </div>
  );
}

class HeaderContainer extends React.Component {


  render() {
    return <Header />
  }
}

export default HeaderContainer;
