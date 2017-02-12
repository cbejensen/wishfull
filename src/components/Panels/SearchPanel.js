import React from 'react'
import {Search} from 'components/Search'
import TextLink from 'components/TextLink'
import {Grid} from 'react-bootstrap'

export default function SearchPanel(props) {
  const styles = {
    container: {
      background: 'linear-gradient(#383838, #000000)',
      minHeight: '100vh'
    },
    header: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize: '6vmin'
    },
    textLink: {
      textAlign: 'center',
      padding: '15px 0'
    }
  }
  return (
    <div style={styles.container}>
      <Grid>
        <h3 style={styles.header}>See who's on Wishfull</h3>
        <Search categories={['users']} placeHolder={'Search a friend\'s name'} />
        <div style={styles.textLink}>
          <TextLink
            text='Join Now'
            link='/sign-up'
            color='#ffffff'
            fontSize='4vmin' />
        </div>
      </Grid>
    </div>
  )
};

// SearchPanel.propTypes = {
//   PROP: React.PropTypes.TYPE.isRequired
// }
