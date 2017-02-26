import React from 'react'
import CenterAlign from 'components/CenterAlign'
import {Glyphicon, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router'
import logo from 'images/logo.png'
import './Nav.css'

export default function NavBar(props) {
  const styles = {
    container: {
      height: '70px',
      position: 'relative'
    },
    side: {
      position: 'absolute',
      top: '0',
      height: '100%',
      fontSize: '30px'
    },
    center: {
      height: '100%',
      padding: '5px 0',
      textAlign: 'center'
    },
    right: {
      right: '0'
    },
    logo: {
      height: '90%'
    }
  }
  return (
    <div style={styles.container} className='Nav-main'>
      <div style={styles.side}>
        <CenterAlign horizontal={false}>
          <Glyphicon glyph="menu-hamburger" onClick={props.toggleMenu}/>
        </CenterAlign>
      </div>
      <div style={styles.center}>
        <Link to={props.uid ? '/home' : '/'}>
          <img style={styles.logo} src={logo} alt="W"/>
        </Link>
      </div>
      <div style={{...styles.side, ...styles.right}}>
        <CenterAlign horizontal={false}>
          <Glyphicon glyph="search" onClick={props.toggleSearch}/>
        </CenterAlign>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  uid: React.PropTypes.node.isRequired,
  toggleMenu: React.PropTypes.func.isRequired,
  toggleSearch: React.PropTypes.func.isRequired
}
