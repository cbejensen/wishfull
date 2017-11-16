import React from 'react'
import AvatarForm from './AvatarForm'
import {uploadFile} from 'utils/firebaseHelpers'

class AvatarFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: null,
      img: null,
      loading: false
    }
    this.selectAvatar = this.selectAvatar.bind(this)
    this.showImg = this.showImg.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  selectAvatar(file) {
    this.setState({
      file: file
    })
  }
  showImg(img) {
    this.setState({img: img})
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState({loading: true})
    if (this.state.file) {
      const {file} = this.state
      const path = `images/avatars/${this.props.uid}`
      uploadFile(file, path).then(res => {
        window.location.reload(true)
      }, err => {
        alert('There was an error. Please try again.')
        console.log(err)
      })
    } else {
      alert('Please choose a picture first')
    }
  }
  render() {
    return <AvatarForm
      img={this.state.img}
      loading={this.state.loading}
      uid={this.props.uid}
      selectAvatar={this.selectAvatar}
      showImg={this.showImg}
      handleSubmit={this.handleSubmit} />
  }
}

AvatarFormContainer.propTypes = {
  uid: React.PropTypes.node.isRequired
}

export default AvatarFormContainer
