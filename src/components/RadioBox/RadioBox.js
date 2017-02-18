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
      color: props.selected
        ? '#656565'
        : '#000000'
    },
    radioRight: {
      color: props.selected
        ? '#000000'
        : '#656565'
    },
    underline: {
      width: '50%',
      position: 'absolute',
      bottom: '0',
      left: props.selected
        ? '50%'
        : '0',
      height: '1px',
      backgroundColor: 'black',
      transition: '.5s'
    }
  }
  return (
    <div style={{...styles.container, ...props.style}}>
      <div
        style={{...styles.radio, ...styles.radioLeft}}
        onClick={props.select.bind(null, 0)}>
        {props.textLeft}
      </div>
      <div
        style={{...styles.radio, ...styles.radioRight}}
        onClick={props.select.bind(null, 1)}>
        {props.textRight}
      </div>
      <div style={styles.underline}></div>
    </div>
  )
};

RadioBox.propTypes = {
  select: React.PropTypes.func.isRequired,
  textLeft: React.PropTypes.string,
  textRight: React.PropTypes.string,
  style: React.PropTypes.object
}
