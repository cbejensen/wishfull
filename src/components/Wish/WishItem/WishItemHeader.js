import React from 'react';
import './WishItem.css';

class WishItemHeader extends React.PureComponent {
  render() {
    const styles = {
      primaryColor: {
        color: this.props.primaryColor || '#2f2f2f'
      },
      secondaryColor: {
        color: this.props.secondaryColor || '#474747'
      },
      priorityText: {
        color: this.props.priorityColor,
        lineHeight: '1em'
      }
    };
    return (
      <div id={'WishItem-header-' + this.props.index}>
        <div className="WishItem-priority-container">
          <div className="WishItem-priority-word" style={styles.secondaryColor}>
            PRIORITY
          </div>
          <div className="WishItem-priority" style={styles.priorityText}>
            {this.props.wish.priority}
          </div>
        </div>
        <div className="WishItem-title" style={styles.primaryColor}>
          {this.props.wish.title}
        </div>
        <div className="WishItem-price" style={styles.secondaryColor}>
          {this.props.wish.price ? `$${this.props.wish.price}` : ''}
          {this.props.wish.url && (
            <span
              style={{
                marginLeft: 10
              }}
              onClick={this.props.openLink}
            >
              <a href={this.props.wish.url} target="_blank">
                Open link
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default WishItemHeader;
