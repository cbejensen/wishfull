import React from 'react'
import ImageLeftCentered from 'components/ImageLeftCentered'
import { Grid, Row, Col } from 'react-bootstrap'
import {Glyphicon} from 'react-bootstrap'

export default function SummaryPanel(props) {
  const styles = {
    container: {
      paddingTop: '20px'
    },
    feature: {
      margin: '0 8px',
      height: '10vmax'
    },
    img: {
      fontSize: '10vmax'
    },
    text: {
      fontSize: '6vmin',
      // avoid words colliding
      lineHeignt: '22px'
    }
  }
  const featureArray = [{
    img: <Glyphicon glyph='star-empty' style={styles.img} />,
    text: 'Create your own wish list',
    styles: {
      color: '#c55547'
    }
  }, {
    img: <Glyphicon glyph='user' style={styles.img} />,
    text: 'See what your friends really want',
    styles: {
      color: '#3695ad'
    }
  }, {
    img: <Glyphicon glyph='check' style={styles.img} />,
    text: 'Know what\'s already been fulfilled',
    styles: {
      color: '#14ad5f'
    }
  }, {
    img: <Glyphicon glyph='gift' style={styles.img} />,
    text: 'Give the perfect gift',
    styles: {
      color: '#6f2199'
    }
  }]
  return (
    <div style={{...styles.container, ...props.styles}}>
      {featureArray.map((feature, i) => {
        // show hr below every feature but last
        let showHR = (i !== featureArray.length - 1)
        return (
          <div>
            <ImageLeftCentered
              img={feature.img}
              style={{...styles.feature, ...feature.styles}}>
              <span style={styles.text}>{feature.text}</span>
            </ImageLeftCentered>
            {showHR ? <hr /> : null}
          </div>
        )
      })}
    </div>
  )
}

SummaryPanel.propTypes = {
  style: React.PropTypes.object
}
