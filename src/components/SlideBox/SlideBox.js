import React from 'react'
import {RadioBox} from 'components/RadioBox'

export default function SlideBox(props) {
  const styles = {
    container: {
      overflow: 'hidden'
    },
    radioContainer: {
      padding: '10px 0'
    },
    panelContainer: {
      position: 'relative',
      left: props.leftSelected
        ? '0'
        : '-100%',
      overflow: 'hidden',
      width: '200%',
      transition: '.5s'
    },
    panel: {
      float: 'left',
      width: '50%',
    }
  }
  return (
    <div style={styles.container}>
      <div style={styles.radioContainer}>
        <RadioBox
          radioLeft={props.radioLeft}
          radioRight={props.radioRight}
          handleSelect={props.slide} />
      </div>
      <div style={styles.panelContainer}>
        <div style={styles.panel}>
          {props.panelLeft}
        </div>
        <div style={styles.panel}>
          {props.panelRight}
        </div>
      </div>
    </div>
  )
}

SlideBox.propTypes = {
  slide: React.PropTypes.func,
  leftSelected: React.PropTypes.bool.isRequired,
  panelLeft: React.PropTypes.node.isRequired,
  panelRight: React.PropTypes.node.isRequired,
  radioLeft: React.PropTypes.string,
  radioRight: React.PropTypes.string
}
