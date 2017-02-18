import React from 'react'
import Avatar from './Avatar'
import { getFile } from 'utils/firebaseHelpers'
import defaultAvatar from 'images/user-icon.svg'

class AvatarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: defaultAvatar
    }
  }
  componentDidMount() {
    this.mounted = true
    this.getAvatar(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getAvatar(nextProps)
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  getAvatar(props) {
    getFile(`images/avatars/${props.uid}`).then(url => {
      if (this.mounted) this.setState({url: url})
    }, err => {})
  }
  render() {
    return <Avatar url={this.state.url}/>
  }
}

AvatarContainer.propTypes = {
  uid: React.PropTypes.node.isRequired
}

export default AvatarContainer
