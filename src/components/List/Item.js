import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Item({ item }) {
  let title;
  if (item.url) {
    title = (
      <a className="h3" href={item.url} target="_blank">
        {item.title}
      </a>
    )
  } else {
    title = <span className="h3">{item.title}</span>
  }
  return (
    <div><Row>
      <Col xs={4}>
        {title}
      </Col>
      <Col xs={4}>
        {item.price ? '$' + item.price : null}
      </Col>
      <Col xs={4}>
        Priority: {item.priority ? item.priority : null}
      </Col>
      <Col xs={12}>
        {item.description ? item.description : null}
      </Col>

    </Row><hr/></div>
  );
}
