import React from 'react'

class Avatar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {width: ''}
  }
  componentDidMount() {
    this.setState({width: this.avatar.offsetHeight})
  }
  render() {
    const url = `url("${this.props.url}")`
    const style = {
      backgroundImage: url,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: '100%',
      width: this.state.width,
      borderRadius: '100%',
      overflow: 'hidden',
      display: 'inline-block'
    }
    return (
      <div
        style={style}
        ref={e => {this.avatar = e}}>
      </div>
    )
  }
}

Avatar.propTypes = {
  url: React.PropTypes.string.isRequired
}

export default Avatar
