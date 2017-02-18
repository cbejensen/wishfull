import React from 'react'

export default function RadioBox(props) {
  const styles = {
    container: {
      position: 'relative',
      fontSize: '2em'
    },
    radio: {
      width: '50%',
      display: 'inline-block',
      textAlign: 'center',
      cursor: 'pointer',
      transition: '.5s'
    },
    radioLeft: {
      color: props.leftSelected
        ? '#000000'
        : '#656565'
    },
    radioRight: {
      color: props.leftSelected
        ? '#656565'
        : '#000000'
    },
    underline: {
      width: '50%',
      position: 'absolute',
      bottom: '0',
      left: props.leftSelected
        ? '0'
        : '50%',
      height: '1px',
      backgroundColor: 'black',
      transition: '.5s'
    }
  }
  return (
    <div style={{...styles.container, ...props.style}}>
      <div
        style={{...styles.radio, ...styles.radioLeft}}
        onClick={props.select.bind(null, true)}>
        {props.radioLeft}
      </div>
      <div
        style={{...styles.radio, ...styles.radioRight}}
        onClick={props.select.bind(null, false)}>
        {props.radioRight}
      </div>
      <div style={styles.underline}></div>
    </div>
  )
};

RadioBox.propTypes = {
  select: React.PropTypes.func.isRequired,
  leftSelected: React.PropTypes.bool.isRequired,
  radioLeft: React.PropTypes.string,
  radioRight: React.PropTypes.string,
  style: React.PropTypes.object
}
