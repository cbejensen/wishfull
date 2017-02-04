import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import galaxyTreeImg from 'images/galaxy-tree.jpg'
import smoothscroll from 'smoothscroll'

export default function GalaxyPanel(props) {
  const styles = {
    galaxyPanel: {
      position: 'relative',
      height: '100vh',
      background: `url(${galaxyTreeImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      textAlign: 'center',
      color: '#ffffff',
      fontFamily: 'Amatic SC, arial',
      fontSize: '5em',
      paddingTop: '10vh'
    },
    downArrow: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '60px',
      paddingTop: '15px',
      // tree in img is a bit right of center
      paddingLeft: '10px',
      color: 'rgba(255, 245, 200, 0.9)',
      fontSize: '20px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  }
  const scrollDown = () => {
    const panel = document.getElementById('galaxyPanel')
    smoothscroll(panel.offsetHeight)
  }
  return (
    <div id='galaxyPanel' style={styles.galaxyPanel}>
      {props.text}
      <div style={styles.downArrow} onClick={scrollDown}>
        <Glyphicon glyph="chevron-down" />
      </div>
    </div>
  )
}

GalaxyPanel.propTypes = {
  text: React.PropTypes.string.isRequired
}
