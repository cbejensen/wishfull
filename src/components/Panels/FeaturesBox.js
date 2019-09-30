import React from 'react'
import FeatureBox from './FeatureBox'
import SideScrollContainer from './SideScrollContainer'

export default function FeaturesBox(props) {
  return (
    <SideScrollContainer>
      {scrollY => {
        const distance = `calc(${scrollY}px - 20vh)`
        return (
          <div style={props.style}>
            <FeatureBox
              glyph="star-empty"
              text="Create a wish list"
              backgroundColor="#caa727"
              scrollY={scrollY}
              style={{ left: distance }}
            />
            <FeatureBox
              glyph="user"
              text="See what your friends really want"
              backgroundColor="#2f4765"
              scrollY={scrollY}
              style={{ right: distance }}
            />
            <FeatureBox
              glyph="check"
              text="Know what's already been fulfilled"
              backgroundColor="#2f653d"
              scrollY={scrollY}
              style={{ left: distance }}
            />
            <FeatureBox
              glyph="gift"
              text="Give the perfect gift"
              backgroundColor="#363636"
              scrollY={scrollY}
              style={{ right: distance }}
            />
          </div>
        )
      }}
    </SideScrollContainer>
  )
}
