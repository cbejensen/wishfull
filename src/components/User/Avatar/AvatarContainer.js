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
    getFile(`images/avatars/${this.props.uid}`).then(url => {
      if (this.mounted) {
        this.setState({
          url: url
        })
      }
    }, err => {
      // console.log(err)
    })
  }
  componentWillUnmount() {
    this.mounted = false
  }
  render() {
    return <Avatar url={this.state.url}/>
  }
}

AvatarContainer.propTypes = {
  uid: React.PropTypes.node.isRequired
}

export default AvatarContainer
