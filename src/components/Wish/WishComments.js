import React from 'react'
import WishCommentInput from './WishCommentInput'
import WishCommentsList from './WishCommentsList'

export default class WishComments extends React.Component {
  render() {
    return (
      <div>
        <div>
          <hr style={{ margin: '5px 0 5px 0' }} />
          <WishCommentsList
            uid={this.props.uid}
            userId={this.props.userId}
            wishId={this.props.wishId}
          />
          <WishCommentInput
            uid={this.props.uid}
            userId={this.props.userId}
            user={this.props.user}
            wishId={this.props.wishId}
            wishTitle={this.props.wishTitle}
          />
        </div>
      </div>
    )
  }
}
