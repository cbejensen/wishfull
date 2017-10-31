import React from 'react';
import WishBodyBottom from './WishBodyBottom';
import CheckAuth from 'components/CheckAuth';
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
    const { description, fulfilled, ...propsToPass } = this.props;
    return (
      <div>
        <hr style={styles.hr} />
        <div style={styles.description}>
          {this.props.description || 'No description'}
        </div>
        <WishBodyBottom {...propsToPass} fulfilled={fulfilled || null} />
      </div>
    );
  }
}

WishBody.propTypes = {
  userId: React.PropTypes.node.isRequired,
  wishId: React.PropTypes.string.isRequired,
  uid: React.PropTypes.node,
  wishes: React.PropTypes.array,
  mutable: React.PropTypes.bool,
  description: React.PropTypes.string,
  color: React.PropTypes.string,
  setBoxHeight: React.PropTypes.func
};

export default WishBody;
