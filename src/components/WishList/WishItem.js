import React from 'react';
import EditWishBtn from './EditWishBtn';
import FulfillWishBtn from './FulfillWishBtn';
import { getUser, fulfillWish } from '../../utils/firebaseHelpers'
import { Row, Col } from 'react-bootstrap';
import * as firebase from 'firebase';
import './index.css'

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fulfilledBy: props.item.fulfilledBy
    }
    this.handleFulfill = this.handleFulfill.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.item.fulfilledBy) {
      getUser(nextProps.item.fulfilledBy).then(user => {
        const name = `${user.firstName} ${user.lastName}`;
        this.setState({
          fulfilledBy: name
        })
      }, err => {
        console.log(err);
      })
    }
  }
  componentWillUnmount() {
    const unsubscribe = firebase.auth().onAuthStateChanged(() => {});
    unsubscribe();
  }
  handleFulfill() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fulfillWish(this.props.uid, this.props.id, user.uid)
        .then(res => {}, err => {
          console.log(err);
        })
      } else {
        alert('You must be signed in first!');
      }
    });
  }
  render() {
    return <WishItem {...this.props}
      fulfilledBy={this.state.fulfilledBy}
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
        <Col xs={1} style={{fontWeight: 'bolder'}}>
          {props.item.price ? '$' + props.item.price : null}
        </Col>
        <Col xs={11} style={{color: '#FEC926'}}>
          {props.item.fulfilledBy ? 'Already fulfilled by ' + props.fulfilledBy : null}
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
