import React from 'react'
import FeaturesBox from './FeaturesBox'
import TextLink from 'components/TextLink'
import { Grid } from 'react-bootstrap'
export default function FeaturesPanel(props) {
  const styles = {
    container: {
      height: '100vh',
    },
    featuresBox: {
      height: '70%',
      paddingTop: '10px',
      overflow: 'hidden',
    },
    signUp: {
      padding: '5px',
      height: '15%',
      position: 'relative',
      textAlign: 'center',
      marginTop: '30px',
    },
    verticalCenter: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    },
  }
  return (
    <div style={{ ...styles.container, ...props.style }}>
      <FeaturesBox style={styles.featuresBox} />
      <div style={styles.signUp}>
        <div style={styles.verticalCenter}>
          <TextLink text="Sign Up" link="/sign-up" fontSize="7vmin" />
        </div>
      </div>
    </div>
  )
}

FeaturesPanel.propTypes = {
  style: React.PropTypes.object,
}
