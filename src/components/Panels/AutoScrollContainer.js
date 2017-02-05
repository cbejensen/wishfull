import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import smoothscroll from 'smoothscroll'

export default function AutoScrollContainer(props) {
  const styles = {
    container: {
      position: 'relative'
    },
    downArrow: {
      color: props.arrowColor,
      position: 'absolute',
      bottom: '0',
      width: '100%',
      height: '50px',
      paddingTop: '15px',
      fontSize: '20px',
      textAlign: 'center',
      cursor: 'pointer'
    }
  }
  let e
  const scrollDown = () => {
    const bottomOfContainer = e.offsetTop + e.offsetHeight
    smoothscroll(bottomOfContainer)
  }
  return (
    <div style={styles.container} ref={container => e = container}>
      {props.children}
      <div style={styles.downArrow} onClick={scrollDown}>
        <Glyphicon glyph="chevron-down" />
      </div>
    </div>
  )
}

AutoScrollContainer.propTypes = {
  arrowColor: React.PropTypes.string
}
