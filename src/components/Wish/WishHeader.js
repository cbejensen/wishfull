import React from 'react';
import FulfillmentStatus from './FulfillmentStatus';
import { Glyphicon } from 'react-bootstrap';
import './WishItem.css';

class WishHeader extends React.PureComponent {
  render() {
    const styles = {
      container: {
        display: 'flex'
      },
      head: {
        flex: 1,
        paddingRight: '10px'
      },
      priority: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      priorityText: {
        fontSize: '1rem',
        color: this.props.luminosity === 'dark' ? '#252525' : '#bdbdbd'
      },
      priorityNumber: {
        color: this.props.color,
        fontSize: '4rem',
        lineHeight: 1
      },
      title: {
        color: this.props.luminosity === 'dark' ? '#1c1c1c' : '#ffffff',
        fontSize: '2.5rem'
      },
      subtitle: {
        color: this.props.luminosity === 'dark' ? '#252525' : '#bdbdbd'
      }
    };
    const openLink = e => {
      e.stopPropagation();
    };
    return (
      <div style={styles.container}>
        <div style={styles.head}>
          <div style={styles.title}>{this.props.title}</div>
          <div style={styles.subtitle}>
            {this.props.fulfilled && !this.props.mutable ? (
              <FulfillmentStatus
                fulfillerId={this.props.fulfilled}
                uid={this.props.uid}
                setBoxHeight={this.props.setBoxHeight}
              />
            ) : (
              this.props.price && `$${this.props.price}`
            )}
            {this.props.url && (
              <span
                style={{
                  marginLeft: 10
                }}
                onClick={openLink}
              >
                <a
                  href={this.props.url}
                  className="WishItem-link"
                  target="_blank"
                >
                  Open link{' '}
                  <Glyphicon
                    style={{ fontSize: '1.1rem' }}
                    glyph="new-window"
                  />
                </a>
              </span>
            )}
          </div>
        </div>
        <div style={styles.priority}>
          <div style={styles.priorityText}>PRIORITY</div>
          <div style={styles.priorityNumber}>{this.props.priority}</div>
        </div>
      </div>
    );
  }
}

WishHeader.propTypes = {
  color: React.PropTypes.string,
  fulfilled: React.PropTypes.node,
  price: React.PropTypes.number,
  priority: React.PropTypes.number,
  title: React.PropTypes.string,
  mutable: React.PropTypes.bool.isRequired,
  uid: React.PropTypes.node.isRequired,
  url: React.PropTypes.string,
  setBoxHeight: React.PropTypes.func,
  luminosity: React.PropTypes.string
};

export default WishHeader;
