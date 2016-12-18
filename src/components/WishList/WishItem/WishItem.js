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
      expanded: false
    }
  }
  render() {
    let props = this.props,
        priorityColor,
        btn,
        fulfilled;
    switch (props.priority) {
      case 1:
        priorityColor = 'rgb(255, 245, 0)';
        break;
      case 2:
        priorityColor = 'rgb(255, 220, 0)';
        break;
      case 3:
        priorityColor = 'rgb(255, 200, 0)';
        break;
      case 4:
        priorityColor = 'rgb(255, 175, 0)';
        break;
      case 5:
        priorityColor = 'rgb(255, 150, 0)';
        break;
      case 6:
        priorityColor = 'rgb(255, 125, 0)';
        break;
      case 7:
        priorityColor = 'rgb(255, 100, 0)';
        break;
      case 8:
        priorityColor = 'rgb(255, 80, 0)';
        break;
      case 9:
        priorityColor = 'rgb(255, 50, 0)';
        break;
      case '10':
        console.log('yaya')
        priorityColor = 'rgb(255, 0, 0)';
        break;
      default:
        priorityColor = 'rgb(67, 67, 67)';
    }
    const styles = {
      header: {
        margin: '0 0',
        padding: '10px 15px'
      },
      priorityBackground: {
        backgroundColor: priorityColor
      },
      priorityText: {
        color: priorityColor
      }
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
            <div className="WishItem-container">
              <div
                style={styles.header}>
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
                </div>
              </div>
              <Row className="WishItem-body">
                <Col xs={12} className="WishItem-col">
                  {props.item.description}
                </Col>
              </Row>
              {fulfilled}
              {btn}
            </div>
          </Col>
        </Row>
    );
  }
};

export default WishItem;
