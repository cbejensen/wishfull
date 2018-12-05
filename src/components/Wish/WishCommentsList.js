import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import * as firebase from 'firebase'

export default class WishCommentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: null
    }
  }
  componentDidMount() {
    const ref = firebase.database().ref(`comments/${this.props.wishId}`)
    ref.on('value', snap => {
      const commentsObj = snap.val()
      // convert obj to array
      const comments = Object.keys(commentsObj).map(commentId => ({
        ...commentsObj[commentId],
        id: commentId
      }))
      this.setState({ comments })
    })
  }
  componentWillUnmount() {
    // unsubscribe?
  }
  render() {
    if (this.state.comments === null) return null
    const styles = {
      list: {
        padding: 0,
        listStyle: 'none'
      },
      comment: {
        padding: 10,
        fontSize: '1em',
        display: 'flex',
        justifyContent: 'space-between'
      },
      message: {
        background: 'blue',
        color: 'white',
        padding: 10,
        display: 'inline-block',
        borderRadius: '5px'
      },
      messageByOwner: {
        background: 'gray'
      },
      timestamp: {
        color: 'gray',
        float: 'right',
        fontSize: '.8rem',
        fontWeight: 'bold'
      }
    }
    return (
      <ul style={styles.list}>
        {this.state.comments.map(
          ({ message, timestamp, userId, commentId }) => {
            let isOwner = userId === this.props.uid
            const timeElem = (
              <div style={styles.timestamp}>
                {distanceInWordsToNow(timestamp)}
              </div>
            )
            const msgElem = (
              <p
                style={
                  isOwner
                    ? styles.message
                    : { ...styles.message, ...styles.messageByOwner }
                }
              >
                {message}
              </p>
            )
            // switch order of message and timestamp if owner
            let comment = isOwner ? (
              <li style={styles.comment} key={commentId}>
                {timeElem}
                {msgElem}
              </li>
            ) : (
              <li style={styles.comment} key={commentId}>
                {msgElem}
                {timeElem}
              </li>
            )
            return comment
          }
        )}
      </ul>
    )
  }
}
