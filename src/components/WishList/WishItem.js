import React from 'react';
import EditWishBtn from './EditWishBtn';
import FulfillWishBtn from './FulfillWishBtn';
import Fulfilled from './Fulfilled';
import { fulfillWish } from '../../utils/firebaseHelpers'
import { Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import './index.css'

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFulfilled: this.props.showFulfilled
    }
    this.handleFulfill = this.handleFulfill.bind(this);
  }
  handleFulfill() {
    const removeAuthListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.id, user.uid)
        .then(res => {}, err => {
          console.log(err);
        })
      } else {
        alert('You must be signed in first!');
      }
    });
    removeAuthListener();
  }
  render() {
    return <WishItem item={this.props.item}
      uid={this.props.uid}
      id={this.props.id}
      mutable={this.props.mutable}
      showFulfilled={this.state.showFulfilled}
      handleFulfill={this.handleFulfill}/>
  }
};

export function WishItem(props) {
  let title, priority, btn;
  if (props.item.priority) priority = (
    <div className="priorityBox">
      {props.item.priority}
    </div>
  )
  if (props.mutable) {
    btn = <EditWishBtn uid={props.uid} id={props.id} />
  } else {
    btn = <FulfillWishBtn handleFulfill={props.handleFulfill} />
  }
  if (props.item.url) {
    title = (
      <a className="h3" href={props.item.url} target="_blank" style={{color: '#0000AB'}}>
        {props.item.title}
      </a>
    )
  } else {
    title = <span className="h3">{props.item.title}</span>
  }
  return (
    <div>
      <Row>
        <Col xs={9}>
          {title}
        </Col>
        <Col xs={3}>
          {priority}
        </Col>
      </Row>
      <Row>
        <Col sm={1} xs={4} style={{fontWeight: 'bolder'}}>
          {props.item.price && '$' + props.item.price}
        </Col>
        <Col sm={11} xs={8} style={{color: '#FEC926'}}>
          {(props.showFulfilled && props.item.fulfilled) &&
            <Fulfilled uid={props.item.fulfilled} />}
        </Col>
      </Row>
      <Row style={{marginBottom: '5px'}}>
        <Col xs={9}>
          {props.item.description}
        </Col>
        <Col xs={3} style={{textAlign: 'center'}}>
          {btn}
        </Col>
      </Row><hr/>
    </div>
  );
}

export default WishItemContainer;
