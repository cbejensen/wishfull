import React from 'react'
import CenterAlign from 'components/CenterAlign'
import {Glyphicon} from 'react-bootstrap'
import ImageTextBlock from 'components/ImageTextBlock'

export default function FeatureBox(props) {
  const styles = {
    feature: {
      margin: '0 8px',
      height: '100%',
      color: props.color || '#ffffff',
      backgroundColor: props.backgroundColor || '#000000',
      overflow: 'hidden'
    },
    img: {
      fontSize: '12vmin'
    },
    text: {
      fontSize: '6vmin',
    }
  }
  const img = (
    <CenterAlign>
      <Glyphicon glyph={props.glyph} style={styles.img} />
    </CenterAlign>
  )
  const text = (
    <CenterAlign horizontal={false}>
      <span style={styles.text}>{props.text}</span>
    </CenterAlign>
  )
  return <ImageTextBlock
          img={img}
          text={text}
          style={{...styles.feature, ...props.style}} />
};

FeatureBox.propTypes = {
  glyph: React.PropTypes.string.isRequired,
  text: React.PropTypes.string.isRequired,
  color: React.PropTypes.string,
  backgroundColor: React.PropTypes.string,
  style: React.PropTypes.object
}
