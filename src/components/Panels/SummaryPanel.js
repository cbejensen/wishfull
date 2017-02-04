import React from 'react'
import FeaturesBox from './FeaturesBox'
import ItemBox from 'components/ItemBox'
import {Link} from 'react-router'
import galaxyTreeImg from 'images/galaxy-tree-flipped.jpg'

export default function SummaryPanel(props) {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      background: `url(${galaxyTreeImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'top center',
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
        textDecoration: 'none'
      },
      height: '100%',
      width: '75%',
      maxWidth: '500px',
      textAlign: 'center',
      backgroundColor: '#ffffff'
    }
  }
  return (
    <div style={{...styles.container, ...props.style}}>
      <div style={styles.features}>
        <FeaturesBox />
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

SummaryPanel.propTypes = {
  style: React.PropTypes.object
}
