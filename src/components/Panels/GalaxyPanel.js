import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import {Link} from 'react-router';
import galaxyTreeImg from 'images/galaxy-tree.jpg'
import smoothscroll from 'smoothscroll'

export default function GalaxyPanel(props) {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      background: `url(${galaxyTreeImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'bottom',
      textAlign: 'center',
      color: '#ffffff'
    },
    signIn: {
      container: {
        fontSize: '1.2em',
        textAlign: 'right',
        padding: '10px'
      },
      color: '#ffffff'
    },
    title: {
      fontSize: '15vmin'
    },
    subtitle: {
      fontSize: '5vmin'
    }
  }
  return (
    <div id='galaxyPanel' style={styles.container}>
      <div style={styles.signIn.container}>
        <Link to='/sign-in' style={styles.signIn}>
          Sign In <Glyphicon glyph='arrow-right'/>
        </Link>
      </div>
      <div style={styles.title}>{props.title}</div>
      <div style={styles.subtitle}>{props.subtitle}</div>
    </div>
  )
}

GalaxyPanel.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired
}
