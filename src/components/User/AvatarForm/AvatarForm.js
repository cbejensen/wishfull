import React from 'react'
import { Button } from 'react-bootstrap'

function AvatarForm(props) {
  const style = {
    paddingTop: '10px'
  }
  return (
    <form onSubmit={props.handleSubmit} style={style}>
      <input type="file" onChange={props.selectAvatar} />
      <Button bsStyle="primary" type="submit"
        style={{margin: '20px'}}>Submit</Button>
      {props.loading}
      Refresh page after uploading to see new avatar.
    </form>
  )
}

AvatarForm.propTypes = {
  loading: React.PropTypes.string.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  selectAvatar: React.PropTypes.func.isRequired
}

export default AvatarForm
