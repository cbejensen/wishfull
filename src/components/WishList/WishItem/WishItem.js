import React from 'react';
import EditWishBtn from '../EditWishBtn';
import FulfillWishBtn from '../FulfillWishBtn';
import Fulfilled from '../Fulfilled';
import { Row, Col } from 'react-bootstrap';
import './WishItem.css';

class WishItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: ''
    }
  }
  componentDidMount() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.setHeight)
  }
  setHeight() {
    const headerHeight = document.getElementById(
      'WishItem-header-' + this.props.index
    ).offsetHeight;
    this.setState({height: headerHeight + 15});
  }
  openLink(e) {
    e.stopPropagation();
  }
  render() {
    let props = this.props,
        btn,
        fulfilled;
    let borderColor = 'rgba(181, 181, 181, 0.3)';
    const styles = {
      container: {
        borderRadius: '15px',
        width: '100%',
        border: '4px solid ' + borderColor,
        overflow: 'hidden',
        transition: '0.3s ease-out',
        height: this.state.height
      },
      header: {
        margin: '0 0',
        padding: '10px 15px 0',
        cursor: 'pointer'
      },
      body: {
        padding: '10px 15px'
      },
      priorityBackground: {
        backgroundColor: props.priorityColor
      },
      priorityText: {
        color: props.priorityColor,
        lineHeight: '1em'
      }
    }
    if (props.highlighted || props.selected) {
      styles.container.border = '4px solid ' + props.priorityColor
    }
    if (props.selected) {
      const bodyHeight = document.getElementById(
        'WishItem-body-' + this.props.index
      ).offsetHeight
      styles.container.height = styles.container.height + bodyHeight
    }
    if (props.mutable) {
      btn = <EditWishBtn uid={props.uid} id={props.id} />
    } else {
      btn = <FulfillWishBtn handleFulfill={props.handleFulfill} />
    }
    if (props.showFulfilled && props.item.fulfilled) {
      fulfilled = <Fulfilled uid={props.item.fulfilled} />
    }
    return (
      <Row className="WishItem-row">
        <Col xs={12}>
          <div style={styles.container}
            onMouseEnter={props.handleMouseEnter}
            onMouseLeave={props.handleMouseLeave}>
            <div id={"WishItem-header-" + this.props.index}
              style={styles.header}
              onClick={props.handleSelectWish.bind(null, props.index)}>
              <div className="WishItem-priority-container">
                <div className="WishItem-priority-word">
                  PRIORITY
                </div>
                <div className="WishItem-priority"
                  style={styles.priorityText}>
                  {props.item.priority}
                </div>
              </div>
              <div className="WishItem-title">
                {props.item.title}
              </div>
              <div className="WishItem-price">
                {props.item.price ? `$${props.item.price}` : ''}
                <span style={{marginLeft: 10}} onClick={this.openLink}>
                  <a href={props.item.url} target="_blank">Open link</a>
                </span>
              </div>
            </div>
            <div id={"WishItem-body-" + this.props.index}
              style={styles.body}>
              <hr style={{margin: '0 0 10px 0'}}/>
              {props.item.description}
              <div className="WishItem-fulfilled"
                style={styles.priorityText}>
                {fulfilled}
              </div>
              <div className="WishItem-btn-group">
                {btn}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
};

export default WishItem;
