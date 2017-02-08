import React from 'react'
import FeaturesBox from './FeaturesBox'
import ItemBox from 'components/ItemBox'
import {browserHistory} from 'react-router'
import randomColor from 'randomcolor'

export default function FeaturesPanel(props) {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh'
    },
    features: {
      padding: '10px',
      height: '75%'
    },
    signUpBtn: {
      container: {
        padding: '5px',
        height: '15%',
      },
      text: {
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#000000',
        fontSize: '6vmin',
        overflow: 'hidden',
        textDecoration: 'none'
      },
      height: '100%',
      width: '75%',
      maxWidth: '500px',
      textAlign: 'center',
      backgroundColor: '#ffffff'
    }
  }
  const signUp = () => {
    browserHistory.push('/sign-up')
  }
  return (
    <div style={{...styles.container, ...props.style}}>
      <div style={styles.features}>
        <FeaturesBox id='hey'/>
      </div>
      <div style={styles.signUpBtn.container}>
        <ItemBox
          handleClick={signUp}
          colorTheme='rgba(244, 218, 44, 0.87)'
          style={styles.signUpBtn}>
          <div style={styles.signUpBtn.text}>Sign Up</div>
        </ItemBox>
      </div>
    </div>
  )
}

FeaturesPanel.propTypes = {
  style: React.PropTypes.object
}
