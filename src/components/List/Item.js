import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import './index.css'

export default function Item(props) {
  let title;
  let editBtn;
  if (props.item.url) {
    title = (
      <a className="h3" href={props.item.url} target="_blank" style={{color: '#0000AB'}}>
        {props.item.title}
      </a>
    )
  } else {
    title = <span className="h3">{props.item.title}</span>
  }
  if (props.editItem) {
    editBtn = <Button bsSize="xsmall" onClick={() => {props.editItem(props.id)}}>Edit</Button>
  }
  return (
    <div>
      <Row>
        <Col xs={9}>
          {title}
        </Col>
        <Col xs={3}>
          <div className="priorityBox">
            {props.item.priority ? props.item.priority : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{fontWeight: 'bolder'}}>
          {props.item.price ? '$' + props.item.price : null}
        </Col>
      </Row>
      <Row style={{marginBottom: '5px'}}>
        <Col xs={9}>
          {props.item.description ? props.item.description : null}
        </Col>
        <Col xs={3} style={{textAlign: 'center'}}>
          {editBtn}
        </Col>
      </Row><hr/>
    </div>
  );
}
