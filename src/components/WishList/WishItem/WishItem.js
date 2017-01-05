import React from 'react';
import EditWishBtn from '../EditWishBtn';
import FulfillWishBtn from '../FulfillWishBtn';
import Fulfilled from '../Fulfilled';
import ItemBox from 'components/ItemBox';
import {Row, Col} from 'react-bootstrap';
import './WishItem.css';

class WishItem extends React.Component {
  render() {
    let btn, fulfilled;
    const styles = {
      itemBox: {
        height: this.props.height,
        transition: '0.3s ease-out'
      },
      body: {
        visibility: this.props.selected
          ? 'visible'
          : 'hidden',
        opacity: this.props.selected
          ? '1'
          : '0',
          transition: '.3s ease-out'
      },
      priorityBackground: {
        backgroundColor: this.props.priorityColor
      },
      priorityText: {
        color: this.props.priorityColor,
        lineHeight: '1em'
      }
    }
    if (this.props.mutable) {
      btn = <EditWishBtn uid={this.props.uid} id={this.props.id}/>
    } else {
      btn = <FulfillWishBtn handleFulfill={this.props.handleFulfill}/>
    }
    if (this.props.showFulfilled && this.props.item.fulfilled) {
      fulfilled = <Fulfilled uid={this.props.item.fulfilled}/>
    }
    return (
      <Row className="WishItem-row">
        <Col xs={12}>
          <ItemBox styles={styles.itemBox}
            colorTheme={this.props.priorityColor}
            selected={this.props.selected}
            handleClick={this.props.handleSelectWish.bind(null, this.props.index)}>
            <div id={"WishItem-header-" + this.props.index}>
              <div className="WishItem-priority-container">
                <div className="WishItem-priority-word">
                  PRIORITY
                </div>
                <div className="WishItem-priority"
                  style={styles.priorityText}>
                  {this.props.item.priority}
                </div>
              </div>
              <div className="WishItem-title">
                {this.props.item.title}
              </div>
              <div className="WishItem-price">
                {this.props.item.price
                  ? `$${this.props.item.price}`
                  : ''}
                <span style={{
                  marginLeft: 10
                }} onClick={this.props.openLink}>
                  <a href={this.props.item.url} target="_blank">Open link</a>
                </span>
              </div>
            </div>
            <div id={"WishItem-body-" + this.props.index}
              style={styles.body}>
              <hr style={{
                margin: '0 0 10px 0'
              }}/> {this.props.item.description}
              <div className="WishItem-fulfilled"
                style={styles.priorityText}>
                {fulfilled}
              </div>
              <div className="WishItem-btn-group">
                {btn}
              </div>
            </div>
          </ItemBox>
        </Col>
      </Row>
    );
  }
};

export default WishItem;
