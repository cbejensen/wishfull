import React from 'react'
import {Search} from 'components/Search'
import {Grid} from 'react-bootstrap'

export default function SearchPanel(props) {
  const styles = {
    container: {
      background: 'linear-gradient(#383838, #000000)'
    },
    header: {
      color: '#ffffff',
      textAlign: 'center'
    }
  }
  return (
    <Grid style={styles.container}>
      <h3 style={styles.header}>See who's on Wishfull</h3>
      <Search categories={['users']} />
    </Grid>
  )
};

// SearchPanel.propTypes = {
//   PROP: React.PropTypes.TYPE.isRequired
// }
