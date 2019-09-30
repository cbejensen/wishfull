import React from 'react'
import { Glyphicon } from 'react-bootstrap'

export default function FeatureBox(props) {
  const styles = {
    row: {
      position: 'relative',
      height: '25%'
    },
    feature: {
      display: 'inline-flex',
      alignItems: 'center',
      position: 'absolute',
      padding: '15px',
      color: props.color || '#ffffff',
      backgroundColor: props.backgroundColor || '#000000'
    },
    img: {
      fontSize: '12vmin',
      marginRight: '15px'
    },
    text: {
      fontSize: '5vmin',
      whiteSpace: 'nowrap'
    }
  }
  return (
    <div style={styles.row}>
      <div style={{ ...styles.feature, ...props.style }}>
        <Glyphicon glyph={props.glyph} style={styles.img} />
        <span style={styles.text}>{props.text}</span>
      </div>
    </div>
  )
}

FeatureBox.propTypes = {
  glyph: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  style: React.PropTypes.object
}
