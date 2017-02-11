import React from 'react'
import {Search} from 'components/Search'
import {Grid} from 'react-bootstrap'

export default function SearchPanel(props) {
  const styles = {
    container: {
      backgroundColor: 'linear-gradient(#383838, #00000)',
      height: '500px'
    }
  }
  return (
    <Grid style={styles.container}>
      <Search categories={['users']} />
    </Grid>
  )
};

// SearchPanel.propTypes = {
//   PROP: React.PropTypes.TYPE.isRequired
// }
