import React from 'react'
import FeatureBox from './FeatureBox'

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
          backgroundColor='#e8c724'
          style={{margin: '0 50px 10px 0'}} />
        <FeatureBox
          glyph='user'
          text='See what your friends really want'
          backgroundColor='#363636'
          style={{margin: '0 0 10px 50px'}} />
        <FeatureBox
          glyph='check'
          text="Know what's already been fulfilled"
          backgroundColor='#15b153'
          style={{margin: '0 50px 10px 0'}} />
        <FeatureBox
          glyph='gift'
          text='Give the perfect gift'
          backgroundColor='#363636'
          style={{margin: '0 0 10px 50px'}} />
      </div>
    </div>
  )
}
