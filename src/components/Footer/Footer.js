import React from 'react'
import CenterAlign from 'components/CenterAlign'

export default function Footer(props) {
  const styles = {
    footer: {
      height: '100%',
      backgroundColor: '#000000',
      color: '#6e6e6e',
      fontSize: '.8em',
      textAlign: 'right',
      paddingRight: '10px'
    }
  }
  return (
    <div style={styles.footer}>
      <CenterAlign horizontal={false}>
        Created by Christian Jensen
      </CenterAlign>
    </div>
  )
}
