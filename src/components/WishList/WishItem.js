import React from 'react';
import EditWishBtn from './EditWishBtn';
import FulfillWishBtn from './FulfillWishBtn';
import { Row, Col } from 'react-bootstrap';
import './index.css'

export default function WishItem(props) {
  // TODO: replace title, priority, btn with ternary statements
  let title, priority, btn;
  if (props.item.priority) priority = (
    <div className="priorityBox">
      {props.item.priority}
    </div>
  )
  if (props.mutable) {
    btn = <EditWishBtn id={props.id} />
  } else {
    btn = <FulfillWishBtn id={props.id} />
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
          {props.item.bought ? 'Already fulfilled by ' + props.item.bought : null}
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
