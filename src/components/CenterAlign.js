import React from 'react'

export default function CenterAlign(props) {
  // assume we want centering vertically and horizontally
  let centerHor = true, centerVer = true
  // if horizontal or vertical prop was given
  // change centering to reflect props
  if (props.hasOwnProperty('horizontal')) {
    centerHor = props.horizontal
  }
  if (props.hasOwnProperty('vertical')) {
    centerVer = props.vertical
  }
  // set transform style property
  let transform
  const transformHor = centerHor ? 'translateX(-50%)' : ''
  const transformVer = centerVer ? 'translateY(-50%)' : ''
  if (centerHor && centerVer) {
    transform = transformHor + ' ' + transformVer
  } else {
    transform = transformHor + transformVer
  }
  const styles = {
    center: {
      position: 'relative',
      left: centerHor
        ? '50%'
        : 'inherit',
      top: centerVer
        ? '50%'
        : 'inherit',
      transform: transform
    }
  }
  return (
    <div style={styles.center}>
      {props.children}
    </div>
  )
}
