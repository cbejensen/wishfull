import React from 'react'
import FormInput from '../FormInput'
import { Button } from 'react-bootstrap'
import { addWishComment } from 'utils/firebaseHelpers'

export default class WishCommentInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: ''
    }
  }
  componentDidMount() {
    console.log('mounted')
  }
  handleChange = e => {
    this.setState({ comment: e.target.value })
  }
  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    console.log('got it')
    if (this.state.comment) {
      addWishComment(this.props.uid, this.props.wishId, {
        message: this.state.comment,
        timestamp: Date.now(),
        userId: this.props.userId
      })
        .then(res => console.log(res))
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
              placeholder="Write anonymous comment..."
              onClick={e => e.stopPropagation()}
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
