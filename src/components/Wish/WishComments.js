import React from 'react'
import WishCommentInput from './WishCommentInput'
import WishCommentsList from './WishCommentsList'

export default class WishComments extends React.Component {
  render() {
    return (
      <div>
        <WishCommentInput
          uid={this.props.uid}
          userId={this.props.userId}
          wishId={this.props.wishId}
        />
        <WishCommentsList uid={this.props.uid} wishId={this.props.wishId} />
      </div>
    )
  }
}
