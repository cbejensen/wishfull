import React from 'react'
import {Search} from 'components/Search'
import TextLink from 'components/TextLink'
import {Grid} from 'react-bootstrap'

export default function SearchPanel(props) {
  const styles = {
    container: {
      background: 'linear-gradient(#383838, #000000)',
      minHeight: '100vh',
      paddingTop: '15px'
    },
    header: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '6vmin'
    },
    search: {
      marginBottom: '5vmin'
    },
    textLink: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      textAlign: 'center',
      paddingBottom: '5px'
    }
  }
  return (
    <div style={styles.container}>
      <h3 style={styles.header}>See who's on Wishfull</h3>
      <div style={styles.search}>
        <Search
          excludeWishes
          placeHolder="Search a friend's name"
          userNameColor="#dadada" />
      </div>
      <div style={styles.textLink}>
        <TextLink
          text='Join Now'
          link='/sign-up'
          color='#ffffff'
          fontSize='4vmin' />
      </div>
    </div>
  )
};

// SearchPanel.propTypes = {
//   PROP: React.PropTypes.TYPE.isRequired
// }
