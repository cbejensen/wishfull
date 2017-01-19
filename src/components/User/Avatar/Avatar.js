import React from 'react'

function Avatar(props) {
  const url = `url("${props.url}")`
  const style = {
    backgroundImage: url,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%',
    get width() {
      return '60px' //TODO: make width match height
    },
    borderRadius: '100%',
    overflow: 'hidden',
    display: 'inline-block'
  }
  return <div style={style}></div>
}

Avatar.propTypes = {
  url: React.PropTypes.string.isRequired
}

export default Avatar
