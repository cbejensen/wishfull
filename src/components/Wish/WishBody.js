import React from 'react'
import WishButton from './WishButton'
import WishComments from './WishComments'
import { Link } from 'react-router'
import './WishItem.css'

class WishBody extends React.PureComponent {
  render() {
    const styles = {
      hr: {
        margin: '5px 0 5px 0'
      },
      description: {
        paddingBottom: '5px',
        color: this.props.luminosity === 'dark' ? '#252525' : '#ffffff'
      }
    }
    return (
      <div>
        <hr style={styles.hr} />
        <p style={styles.description}>
          {this.props.description || 'No description'}
        </p>
        {this.props.uid ? (
          <div>
            <WishButton
              fulfilled={this.props.fulfilled}
              uid={this.props.uid}
              userId={this.props.userId}
              wishId={this.props.wishId}
              style={{ display: 'block', textAlign: 'right' }}
            />
            <WishComments
              uid={this.props.uid}
              userId={this.props.userId}
              wishId={this.props.wishId}
            />
          </div>
        ) : (
          <strong style={{ textAlign: 'center' }}>
            <Link to="/sign-in">Sign in</Link> to interact with this wish
          </strong>
        )}
      </div>
    )
  }
}

WishBody.propTypes = {
  userId: React.PropTypes.node.isRequired,
  wishId: React.PropTypes.string.isRequired,
  uid: React.PropTypes.node,
  wishes: React.PropTypes.array,
  fulfilled: React.PropTypes.node,
  mutable: React.PropTypes.bool,
  description: React.PropTypes.string,
  color: React.PropTypes.string,
  setBoxHeight: React.PropTypes.func
}

export default WishBody
