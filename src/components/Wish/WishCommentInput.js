import React from 'react'
import FormInput from '../FormInput'
import { Button } from 'react-bootstrap'
import { addWishComment, getUser } from 'utils/firebaseHelpers'
import { emailWishComment } from 'utils/emailHelpers'

export default class WishCommentInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }
  handleChange = e => {
    this.setState({ comment: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (this.state.comment) {
      addWishComment(
        this.props.uid,
        this.props.userId,
        this.props.wishId,
        this.state.comment
      )
        .then(res => {
          getUser(this.props.userId).then(user => {
            emailWishComment(
              this.props.wishTitle,
              this.state.comment,
              user.email
            )
              .then(res => this.setState({ comment: '' }))
              .catch(err => console.error(err))
          })
        })
        .catch(err => {
          console.error(err)
          alert('Sorry, there was an error. Please try again later.')
        })
    } else {
      alert('Please enter a comment')
    }
  }
  render() {
    const styles = {
      commentRow: {
        display: 'flex',
        alignItems: 'center'
      },
      inputWrapper: {
        flex: 1,
        marginRight: 10
      }
    }
    return (
      <div>
        <form style={styles.commentRow}>
          <div style={styles.inputWrapper}>
            <FormInput
              value={this.state.comment}
              placeholder="Write a question"
              onChange={this.handleChange}
            />
          </div>
          <Button bsStyle="primary" onClick={this.handleSubmit} type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  }
}
