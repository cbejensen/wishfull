import React from 'react'
import {Avatar} from 'components/User/Avatar'
import { Button } from 'react-bootstrap'

function AvatarForm(props) {
  const styles = {
    form: {
      margin: '50px',
      textAlign: 'center'
    },
    imgContainer: {
      height: '120px',
      paddingTop: '20px'
    },
    img: {
      width: '100%'
    },
    fileName: {
      margin: '20px',
      fontSize: '1.5em'
    },
    input: {
      display: 'none'
    }
  }
  let submitText = 'Submit'
  let fileInput
  function openFileModal() {
    fileInput.click()
  }
  function chooseImage(e) {
    submitText = 'Loading...'
    const file = e.target.files[0]
    props.selectAvatar(file)
    // show image
    var reader = new FileReader()
    reader.onloadend = i => {
      props.showImg(reader.result)
    }
    reader.readAsDataURL(file)
    fileInput = null
  }
  return (
    <form onSubmit={props.handleSubmit} style={styles.form}>
      <Button onClick={openFileModal}>Select Image</Button>
      <input
        ref={e => {fileInput = e}}
        type="file"
        id="file-input"
        style={styles.input}
        onChange={chooseImage} />

      <div style={styles.imgContainer}>
        <Avatar url={props.img} uid={props.uid} />
      </div>
      <div style={styles.fileName}>{props.fileName}</div>

      <Button
        type="submit"
        bsStyle="primary"
        bsSize="large"
        disabled={props.loading}>
        {props.loading ? 'Loading...' : 'Submit'}
      </Button>
    </form>
  )
}

AvatarForm.propTypes = {
  uid: React.PropTypes.node.isRequired,
  fileName: React.PropTypes.string.isRequired,
  img: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  selectAvatar: React.PropTypes.func.isRequired
}

export default AvatarForm
