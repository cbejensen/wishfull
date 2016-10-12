import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './index.css'

export default function Item({ item }) {
  let title;
  if (item.url) {
    title = (
      <a className="h3" href={item.url} target="_blank" style={{color: '#0000AB'}}>
        {item.title}
      </a>
    )
  } else {
    title = <span className="h3">{item.title}</span>
  }
  return (
    <div>
      <Row>
        <Col xs={10}>
          {title}
        </Col>
        <Col xs={2}>
          <div className="priorityBox">
            {item.priority ? item.priority : null}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={{fontWeight: "bolder"}}>
          {item.price ? '$' + item.price : null}
        </Col>
      </Row>
      <Row style={{marginBottom: "5px"}}>
        <Col xs={12}>
          {item.description ? item.description : null}
        </Col>
      </Row><hr/>
    </div>
  );
}
