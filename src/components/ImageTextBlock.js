import React from 'react'
import {Row, Col} from 'react-bootstrap'

export default function ImageTextBlock(props) {
  const styles = {
    container: {
      height: '80px'
    },
    imgCol: {
      height: '100%',
      textAlign: 'center'
    },
    textCol: {
      height: '100%',
      padding: props.inverted
        ? '0 0 0 10px'
        : '0 10px 0 0',
      textAlign: props.inverted
        ? 'right'
        : 'left'
    }
  }
  let img;
  if (typeof props.img === 'string') {
    img = <img src={props.img} style={{height: '100%'}}/>
  } else {
    img = props.img
  }
  const imgComponent = (
    <Col xs={4} style={styles.imgCol}>
      <VerticalCenter>
        {img}
      </VerticalCenter>
    </Col>
  )
  return (
    <Row style={{...styles.container, ...props.style}}>
      {!props.inverted && imgComponent}
      <Col xs={8} style={styles.textCol}>
        <VerticalCenter>
          {props.children}
        </VerticalCenter>
      </Col>
      {props.inverted && imgComponent}
    </Row>
  )
};

function VerticalCenter(props) {
  const styles = {
    center: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }
  return (
    <div style={styles.center}>
      {props.children}
    </div>
  )
}

ImageTextBlock.propTypes = {
  img: React.PropTypes.node.isRequired,
  inverted: React.PropTypes.bool,
  style: React.PropTypes.object
}
