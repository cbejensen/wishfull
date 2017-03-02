import React from 'react'
import TextLink from 'components/TextLink'
import logo from 'images/logo.png'

export default function TitlePanel(props) {
  const styles = {
    container: {
      position: 'relative',
      height: '100vh',
      background: 'linear-gradient(#000000, #383838)',
      textAlign: 'center',
      color: '#ffffff'
    },
    signIn: {
      textAlign: 'right',
      padding: '10px',
      fontSize: '4vmin'
    },
    title: {
      fontFamily: 'Dosis, sans-serif',
      fontSize: '15vmin'
    },
    subtitle: {
      fontSize: '5vmin'
    },
    logoContainer: {
      height: '40vmin'
    },
    logo: {
      height: '100%'
    }
  }
  return (
    <div id='TitlePanel' style={styles.container}>
      <div style={styles.signIn}>
        <TextLink text='Sign In' link='/sign-in' color='#ffffff' />
      </div>
      <div style={styles.logoContainer}>
        <img style={styles.logo} src={logo} alt=""/>
      </div>
      <div style={styles.title}>{props.title}</div>
      <div style={styles.subtitle}>{props.subtitle}</div>
    </div>
  )
}

TitlePanel.propTypes = {
  title: React.PropTypes.string.isRequired,
  subtitle: React.PropTypes.string.isRequired
}
