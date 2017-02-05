import React from 'react'
import FeaturesBox from './FeaturesBox'
import ItemBox from 'components/ItemBox'
import {Link} from 'react-router'

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
        color: '#000000',
        fontSize: '2em',
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
  const testing = function() {
    var test = document.getElementById('hey')
    console.log(test);
  }
  return (
    <div style={{...styles.container, ...props.style}} ref={container => console.log(container.offsetTop)}>
      <div style={styles.features}>
        <FeaturesBox id='hey' ref={testing}/>
      </div>
      <div style={styles.signUpBtn.container}>
        <ItemBox colorTheme='#000000' style={styles.signUpBtn}>
          <Link to='/create-account' style={styles.signUpBtn.text}>
            Sign Up
          </Link>
        </ItemBox>
      </div>
    </div>
  )
}

FeaturesPanel.propTypes = {
  style: React.PropTypes.object
}
