import React from 'react'
import AvatarForm from './AvatarForm'
import { getFile, uploadFile } from 'utils/firebaseHelpers'

class AvatarFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newAvatar: null,
      loading: ''
    }
    this.selectAvatar = this.selectAvatar.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  selectAvatar(e) {
    var img = e.target.files[0]
    this.setState({
      newAvatar: img
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.newAvatar) {
      this.setState({loading: 'Loading...'})
      const file = this.state.newAvatar
      const path = `images/avatars/${this.props.user.uid}`
      uploadFile(file, path).then(res => {
        alert('Success!')
        getFile(path).then(avatar => {
          this.setState({
            loading: ''
          })
        })
      }, err => {
        alert('There was an error. Please try again.')
        console.log(err)
      })
    } else {
      alert('Please choose a picture first')
    }
  }
  render() {
    return <AvatarForm loading={this.state.loading}
      selectAvatar={this.selectAvatar}
      handleSubmit={this.handleSubmit}/>
  }
}

AvatarFormContainer.propTypes = {
  user: React.PropTypes.object.isRequired
}

export default AvatarFormContainer
