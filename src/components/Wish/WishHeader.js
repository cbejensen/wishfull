import React from 'react';
import './WishItem.css';

class WishHeader extends React.PureComponent {
  render() {
    const styles = {
      priorityText: {
        color: this.props.color,
        lineHeight: '1em'
      },
      darkText: {
        color: '#1c1c1c'
      },
      standardText: {
        color: '#353535'
      }
    };
    const openLink = e => {
      e.stopPropagation();
    };
    return (
      <div>
        <div className="WishItem-priority-container">
          <div className="WishItem-priority-word" style={styles.standardText}>
            PRIORITY
          </div>
          <div className="WishItem-priority" style={styles.priorityText}>
            {this.props.priority}
          </div>
        </div>
        <div className="WishItem-title" style={styles.darkText}>
          {this.props.title}
        </div>
        <div className="WishItem-price" style={styles.standardText}>
          {this.props.price ? `$${this.props.price}` : ''}
          {this.props.url && (
            <span
              style={{
                marginLeft: 10
              }}
              onClick={openLink}
            >
              <a href={this.props.url} target="_blank">
                Open link
              </a>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default WishHeader;
