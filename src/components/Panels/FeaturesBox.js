import React from 'react'
import FeatureBox from './FeatureBox'
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
      fontSize: '12vmin'
    },
    text: {
      fontSize: '6vmin',
      // avoid words colliding
      lineHeignt: '20px'
    }
  }
  return (
    <div style={styles.container}>
      <div style={{height: '25%'}}>
        <FeatureBox
          glyph='star-empty'
          text='Create your own wish list'
          backgroundColor='rgba(35, 134, 196, 0.5)' />
        <FeatureBox
          glyph='user'
          text='See what your friends really want'
          backgroundColor='rgba(153, 24, 59, 0.5)' />
        <FeatureBox
          glyph='check'
          text="Know what's already been fulfilled"
          backgroundColor='rgba(65, 113, 23, 0.5)' />
        <FeatureBox
          glyph='gift'
          text='Give the perfect gift'
          backgroundColor='rgba(112, 17, 131, 0.5)' />
      </div>
    </div>
  )
}
