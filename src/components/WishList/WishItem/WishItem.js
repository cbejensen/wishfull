import React from 'react';
import EditWishBtn from '../EditWishBtn';
import FulfillWishBtn from '../FulfillWishBtn';
import { Fulfilled } from '../Fulfilled';
import { Row, Col } from 'react-bootstrap';
import './WishItem.css';

class WishItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: ''
    }
  }
  componentDidMount() {
    const headerClass = 'WishItem-header-' + this.props.index;
    const e = document.getElementById(headerClass);
    this.setState({headerHeight: e.offsetHeight});
  }
  render() {
    let props = this.props,
        title = props.item.title,
        price = props.item.price,
        priority = props.item.priority,
        description = props.item.description,
        url = props.item.url,
        priorityColor,
        btn;
    switch (priority) {
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
      case 10:
        priorityColor = 'rgb(255, 0, 0)';
        break;
    }
    const styles = {
      header: {
        height: this.state.headerHeight,
        color: '#434343',
        margin: '0 0',
        paddingTop: '10px',
        paddingBottom: '10px',
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
    if (url) {
      title = (
        <a href={url} target="_blank" >
          {title}
        </a>
      )
    }
    return (
        <Row className="WishItem-row">
          <Col xs={12}>
            <div className="WishItem-container">
              <Row id={'WishItem-header-' + props.index}
                style={styles.header}
                className={'priority-background-color-' + priority}>
                <Col xs={9} sm={10} className="WishItem-col">
                  <div className="WishItem-title-container">
                    <span className="WishItem-title">
                      {title}
                    </span>
                  </div>
                  <div className="WishItem-price-container">
                    <span className="WishItem-price">
                      {price ? `$${price}` : ''}
                    </span>
                  </div>
                </Col>
                <Col xs={3} sm={2} className="WishItem-col">
                  <div className="WishItem-priority-word-container">
                    <div className="WishItem-priority-word"
                      style={styles.priorityText}>
                      PRIORITY
                    </div>
                  </div>
                  <div className="WishItem-priority-container">
                    <div className="WishItem-priority"
                      style={styles.priorityText}>
                      {priority}
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="WishItem-body">
                <Col xs={12} className="WishItem-col">
                  {description}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
    );
  }
};

export default WishItem;
