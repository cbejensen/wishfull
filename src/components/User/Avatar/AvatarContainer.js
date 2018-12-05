import React from 'react'
import Avatar from './Avatar'
import AvatarLoading from './AvatarLoading'
import { getFile, uploadFile } from 'utils/firebaseHelpers'
import defaultAvatar from 'images/default-avatar.svg'

class AvatarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      url: defaultAvatar,
      file: null,
      loading: false
    }
  }
  componentDidMount() {
    this.mounted = true
    this.getAvatar(this.props.url, this.props.uid)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getAvatar(nextProps.url, nextProps.uid)
    }
  }
  componentWillUnmount() {
    this.mounted = false
  }
  selectAvatar = () => {
    if (this.props.mutable) {
      this.fileInput.click()
    }
  }
  submitAvatar = () => {
    const file = this.fileInput.files[0]
    const path = `images/avatars/${this.props.uid}`
    this.setState({ loading: true })
    uploadFile(file, path).then(
      res => {
        this.getAvatar(false, this.props.uid)
      },
      err => {
        console.log(err)
        alert('There was an error. Please try again.')
      }
    )
  }
  getAvatar(url, uid) {
    if (url) {
      this.setState({ url: url, loading: false })
    } else if (uid) {
      getFile(`images/avatars/${uid}`).then(
        url => {
          if (this.mounted && !this.props.url) {
            this.setState({ url: url, loading: false })
          }
        },
        err => {}
      )
    }
  }
  render() {
    const size = this.props.size || '100px'
    return (
      <div>
        <input
          ref={input => {
            this.fileInput = input
          }}
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          onChange={this.submitAvatar}
        />
        {this.state.loading ? (
          <AvatarLoading size={size} style={this.props.style} />
        ) : (
          <Avatar
            url={this.state.url}
            size={size}
            style={this.props.style}
            onClick={this.selectAvatar}
            mutable={this.props.mutable}
          />
        )}
      </div>
    )
  }
}

AvatarContainer.propTypes = {
  uid: React.PropTypes.node,
  url: React.PropTypes.string,
  size: React.PropTypes.string,
  style: React.PropTypes.object,
  mutable: React.PropTypes.bool
}

export default AvatarContainer
