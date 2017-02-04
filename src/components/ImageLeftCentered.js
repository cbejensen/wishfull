import React from 'react'
import {Row, Col} from 'react-bootstrap'

export default function ImageLeftCentered(props) {
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
      padding: '0'
    },
    textWrapper: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '100%'
    }
  }
  let img;
  if (typeof props.img === 'string') {
    img = <img src={props.img} style={{height: '100%'}}/>
  } else {
    img = props.img
  }
  console.log(typeof props.img);
  console.log(img);
  return (
    <Row style={{...styles.container, ...props.style}}>
      <Col xs={3} style={styles.imgCol}>
        {img}
      </Col>
      <Col xs={9} style={styles.textCol}>
        <div style={styles.textWrapper}>
          {props.children}
        </div>
      </Col>
    </Row>
  )
};

ImageLeftCentered.propTypes = {
  img: React.PropTypes.node.isRequired,
  style: React.PropTypes.object
}
