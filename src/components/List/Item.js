import React from 'react';

import { Row, Col } from 'react-bootstrap';

export default function Item(props) {
  return (
    <div><Row>
      <Col xs={4}><a href={props.item.url}>{props.item.title}</a></Col>
      <Col xs={4}>{props.item.price}</Col>
      <Col xs={4}>{props.item.priority}</Col>
      <Col xs={12}>{props.item.description}</Col>

    </Row><hr/></div>
  );
}
