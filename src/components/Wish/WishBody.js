import React from 'react';
import WishButton from './WishButton';
import { Link } from 'react-router';
import './WishItem.css';

class WishBody extends React.PureComponent {
  render() {
    const styles = {
      hr: {
        margin: '5px 0 5px 0'
      },
      description: {
        paddingBottom: '5px'
      }
    };
    return (
      <div>
        <hr style={styles.hr} />
        <div style={styles.description}>
          {this.props.description || 'No description'}
        </div>
        <div style={{ textAlign: 'right' }}>
          {this.props.uid ? (
            <WishButton
              fulfilled={this.props.fulfilled}
              uid={this.props.uid}
              userId={this.props.userId}
              wishId={this.props.wishId}
            />
          ) : (
            <div style={{ textAlign: 'center' }}>
              Please <Link to="sign-in">sign in</Link> to interact with this
              wish
            </div>
          )}
        </div>
      </div>
    );
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
};

export default WishBody;
