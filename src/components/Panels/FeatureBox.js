import React from 'react'
import {Row, Col} from 'react-bootstrap'

export default function FeatureBox(props) {
  const styles = {
    container: {
      height: '70px',
      margin: '20px 10px',
      textAlign: 'center',
      position: 'relative'
    },
    icon: {
      wrapper: {

      },
      height: '100%'
    },
    text: {
      wrapper: {

      },
      fontSize: '25px',
      paddingLeft: '15px',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.icon.wrapper}>
        <img style={styles.icon} src={props.icon} />
      </div>
      <div style={styles.text.wrapper}>
        <span style={styles.text}>{props.title}</span>
      </div>
    </div>
  )
}

FeatureBox.propTypes = {
  icon: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired
}
