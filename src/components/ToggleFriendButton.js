import React from 'react'
import {getFriendStatus, toggleFriend} from 'utils/firebaseHelpers'
import {Button, Glyphicon} from 'react-bootstrap'

class ToggleFriendButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {friend: ''}
    this.toggleFriend = this.toggleFriend.bind(this)
  }
  componentDidMount() {
    getFriendStatus(this.props.uid, this.props.friendId).then(res => {
      this.setState({friend: res})
    }, err => {
      console.log(err)
    })
  }
  toggleFriend() {
    toggleFriend(this.props.uid, this.props.friendId).then(res => {
      this.setState({friend: res})
    }, err => {
      console.log(err)
    })
  }
  render() {
    if (typeof this.state.friend === 'string') return null
    let status
    if (this.state.friend) {
      status = <Glyphicon glyph='ok'></Glyphicon>
    } else {
      status = <Glyphicon glyph='remove'></Glyphicon>
    }
    return (
      <div style={{textAlign: 'center', margin: '10px'}}>
        <Button
          onClick={this.toggleFriend}
          bsStyle={this.state.friend ? 'info' : 'warning'}>
          Friends {status}
        </Button>
        <div><em>Click to {this.state.friend ? 'unfriend' : 'befriend'}</em></div>
      </div>
    )
  }
};

ToggleFriendButton.propTypes = {
  uid: React.PropTypes.node,
  friendId: React.PropTypes.string
}

export default ToggleFriendButton
