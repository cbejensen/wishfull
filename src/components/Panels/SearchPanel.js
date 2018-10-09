import React from 'react'
import {Search} from 'components/Search'
import TextLink from 'components/TextLink'

export default function SearchPanel(props) {
  const styles = {
    container: {
      background: 'linear-gradient(#383838, #000000)',
      padding: '15px 0',
      minHeight: '100vh'
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
          luminosity='light' />
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
