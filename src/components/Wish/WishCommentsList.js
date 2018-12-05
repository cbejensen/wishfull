import React from 'react'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { Avatar } from '../User/Avatar'
import * as firebase from 'firebase'

export default class WishCommentsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: null
    }
  }
  componentDidMount() {
    this.firebaseListener = firebase
      .database()
      .ref(`comments/${this.props.wishId}`)
      .orderByChild('timestamp')
    this.firebaseListener.on('value', snap => {
      if (!snap.val()) return
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
    this.firebaseListener.off()
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
        justifyContent: 'space-between',
        alignItems: 'center'
      },
      message: {
        color: 'white',
        padding: '5px 10px',
        margin: 0,
        display: 'inline-block',
        borderRadius: '5px'
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
        {this.state.comments
          .reverse()
          .map(({ message, timestamp, author, id }) => {
            let isOwnComment = author && author === this.props.uid
            return (
              <li style={styles.comment} key={id}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {isOwnComment && (
                    <Avatar
                      uid={this.props.uid}
                      size="40px"
                      style={{ marginRight: 10 }}
                    />
                  )}
                  <p
                    style={{
                      ...styles.message,
                      background: isOwnComment ? '#337ab6' : 'gray'
                    }}
                  >
                    {message}
                  </p>
                </div>
                {timestamp && (
                  <div style={styles.timestamp}>
                    {distanceInWordsToNow(timestamp)}
                  </div>
                )}
              </li>
            )
          })}
      </ul>
    )
  }
}
