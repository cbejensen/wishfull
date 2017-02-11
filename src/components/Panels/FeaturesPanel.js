import React from 'react'
import FeaturesBox from './FeaturesBox'
import ItemBox from 'components/ItemBox'
import TextLink from 'components/TextLink'
import {Grid, Glyphicon} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import randomColor from 'randomcolor'

export default function FeaturesPanel(props) {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh'
    },
    FeaturesBox: {
      height: '75%',
      paddingTop: '10px'
    },
    signUp: {
      padding: '5px',
      height: '15%',
      position: 'relative',
      textAlign: 'center'
    },
    verticalCenter: {
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }
  return (
    <Grid style={{...styles.container, ...props.style}}>
      <div style={styles.FeaturesBox}>
        <FeaturesBox />
      </div>
      <div style={styles.signUp}>
        <div style={styles.verticalCenter}>
          <TextLink
            text='Sign Up'
            link='/sign-up'
            fontSize='7vmin'/>
        </div>
      </div>
    </Grid>
  )
}

FeaturesPanel.propTypes = {
  style: React.PropTypes.object
}
