import React from 'react'
import TextLink from 'components/TextLink'
import {Glyphicon} from 'react-bootstrap'
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
      textAlign: 'right',
      padding: '10px',
      fontSize: '4vmin'
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
      <div style={styles.signIn}>
        <TextLink text='Sign In' link='/sign-in' color='#ffffff' />
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
