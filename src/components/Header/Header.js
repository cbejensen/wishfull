import React from 'react';
import { Link } from 'react-router'
import NavLink from '../NavLink/NavLink'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

export function Header(props) {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">
            <img src="" alt="WISHFULL"/>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem>
            <NavLink to="/home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/search">Search</NavLink>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem>
            <NavLink to="/sign-in">Sign In</NavLink>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

class HeaderContainer extends React.Component {


  render() {
    return <Header />
  }
}

export default HeaderContainer;
