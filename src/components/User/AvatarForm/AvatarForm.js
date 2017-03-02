import React from 'react'
import {Avatar} from 'components/User/Avatar'
import { Button } from 'react-bootstrap'

function AvatarForm(props) {
  const styles = {
    form: {
      margin: '50px',
      textAlign: 'center'
    },
    imgBox: {
      margin: '0 auto 20px',
      width: '200px'
    },
    imgContainer: {
      height: '120px'
    },
    fileName: {
      margin: '20px',
      fontSize: '1.5em'
    },
    input: {
      display: 'none'
    }
  }
  let fileInput
  function openFileModal() {
    fileInput.click()
  }
  function chooseImage(e) {
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
      <input
        ref={e => {fileInput = e}}
        type="file"
        id="file-input"
        style={styles.input}
        onChange={chooseImage} />

      <div style={styles.imgBox}>
        <div style={styles.imgContainer}>
          <Avatar url={props.img} uid={props.uid} />
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <Button
          style={{marginRight: '10px'}}
          bsStyle="warning"
          bsSize="large"
          onClick={openFileModal}>
          Change
        </Button>
        <Button
          type="submit"
          bsStyle="primary"
          bsSize="large"
          disabled={props.loading}>
          {props.loading ? 'Loading...' : 'Submit'}
        </Button>
      </div>

    </form>
  )
}

AvatarForm.propTypes = {
  uid: React.PropTypes.node.isRequired,
  img: React.PropTypes.string,
  handleSubmit: React.PropTypes.func.isRequired,
  selectAvatar: React.PropTypes.func.isRequired
}

export default AvatarForm
