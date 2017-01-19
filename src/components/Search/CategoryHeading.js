import React from 'react'

const CategoryHeading = props => {
  const styles = {
    heading: {
      color: 'white',
      fontSize: '1.4em',
      borderBottom: '1px solid #ffffff'
    }
  }
  return (
    <div style={styles.heading}>{props.text}</div>
  )
}

CategoryHeading.propTypes = {
  text: React.PropTypes.string.isRequired
}

export default CategoryHeading
