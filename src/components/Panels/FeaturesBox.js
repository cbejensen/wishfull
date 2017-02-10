import React from 'react'
import ImageTextBlock from 'components/ImageTextBlock'
import {Glyphicon} from 'react-bootstrap'

export default function FeaturesBox(props) {
  const styles = {
    container: {
      height: '100%'
    },
    feature: {
      margin: '0 8px',
      height: '100%',
      color: '#ffffff',
      overflow: 'hidden',
    },
    img: {
      fontSize: '12vmax'
    },
    text: {
      fontSize: '6vmin',
      // avoid words colliding
      lineHeignt: '20px'
    }
  }
  const featureArray = [{
    img: <Glyphicon glyph='star-empty' style={styles.img} />,
    text: 'Create your own wish list',
    styles: {
      backgroundColor: 'rgba(35, 134, 196, 0.5)',
      borderRadius: '10px 10px 0 0'
    }
  }, {
    img: <Glyphicon glyph='user' style={styles.img} />,
    text: 'See what your friends really want',
    styles: {
      backgroundColor: 'rgba(153, 24, 59, 0.5)'
    }
  }, {
    img: <Glyphicon glyph='check' style={styles.img} />,
    text: 'Know what\'s already been fulfilled',
    styles: {
      backgroundColor: 'rgba(65, 113, 23, 0.5)'
    }
  }, {
    img: <Glyphicon glyph='gift' style={styles.img} />,
    text: 'Give the perfect gift',
    styles: {
      backgroundColor: 'rgba(112, 17, 131, 0.5)',
      borderRadius: '0 0 10px 10px'
    }
  }]
  return (
    <div style={styles.container}>
      {featureArray.map((feature, i) => {
        // every other feature inverts img and text
        let inverted = (i % 2 !== 0)
        // show hr below every feature but last
        let showHR = (i !== featureArray.length - 1)
        return (
          <div key={i} style={{height: '25%'}}>
            <ImageTextBlock
              img={feature.img}
              inverted={inverted}
              style={{...styles.feature, ...feature.styles}}>
              <span style={styles.text}>{feature.text}</span>
            </ImageTextBlock>
            {/* {showHR ? <hr /> : null} */}
          </div>
        )
      })}
    </div>
  )
}
