import React from 'react';

import { Row, Col } from 'react-bootstrap';

export default function Item({ item }) {
  return (
    <div><Row>
      <Col xs={4}><a href={item.url}>{item.title}</a></Col>
      <Col xs={4}>
        {item.price ? item.price : null}
      </Col>
      <Col xs={4}>
        {item.priority ? item.priority : null}
      </Col>
      <Col xs={12}>
        {item.description ? item.description : null}
      </Col>

    </Row><hr/></div>
  );
}
