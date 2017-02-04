import React from 'react'
import {Search} from 'components/Search'

export default function SearchPanel(props) {
  const styles = {
    container: {
      backgroundColor: '#383838',
      height: '500px'
    }
  }
  return (
    <div style={styles.container}>
      <Search categories={['users']} />
    </div>
  )
};

// SearchPanel.propTypes = {
//   PROP: React.PropTypes.TYPE.isRequired
// }
