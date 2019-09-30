import React from 'react'

export default function UserBoxBody(props) {
  // TODO: make this look a lot better and add wish count
  const styles = {
    container: {
      padding: '20px',
      textAlign: 'center',
    },
    bio: {
      color: props.luminosity === 'dark' ? '#1c1c1c' : '#ffffff',
    },
  }
  return (
    <div style={styles.container}>
      <hr />
      <p style={styles.bio}>{props.bio || 'No bio'}</p>
    </div>
  )
}

UserBoxBody.propTypes = {
  userId: React.PropTypes.node.isRequired,
  bio: React.PropTypes.string,
}
