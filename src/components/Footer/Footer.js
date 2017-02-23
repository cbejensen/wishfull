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
      marginTop: '20px',
      paddingRight: '10px'
    }
  }
  return (
    <div style={styles.footer}>
      <CenterAlign horizontal={false}>
        Created by <a href="users/wcqwJKtZWDY36GTObwZAe8PcVw53">
          Christian Jensen
        </a>
      </CenterAlign>
    </div>
  )
}
