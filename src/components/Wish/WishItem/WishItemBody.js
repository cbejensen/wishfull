import React from 'react';
import WishItemBottom from './WishItemBottom';
import CheckAuth from 'components/CheckAuth';
import './WishItem.css';

class WishItemBody extends React.PureComponent {
  render() {
    const styles = {
      body: {
        visibility: this.props.selected ? 'visible' : 'hidden',
        opacity: this.props.selected ? '1' : '0',
        transition: '.3s ease-out'
      },
      primaryColor: {
        color: this.props.primaryColor || '#2f2f2f'
      },
      hr: {
        margin: '5px 0 5px 0'
      }
    };
    return (
      <div style={styles.body} id={'WishItem-body-' + this.props.index}>
        <hr style={styles.hr} />
        <div
          style={{
            ...styles.primaryColor,
            paddingBottom: '5px'
          }}
        >
          {this.props.wish.description || 'No description'}
        </div>
        <CheckAuth>
          <WishItemBottom
            userId={this.props.uid}
            wishId={this.props.wish.id}
            handleFulfill={this.props.handleFulfill}
            mutable={this.props.mutable}
            fulfilled={this.props.wish.fulfilled || null}
            priorityColor={this.props.priorityColor}
            setHeight={this.props.setHeight}
          />
        </CheckAuth>
      </div>
    );
  }
}

export default WishItemBody;
