import React from 'react'
import './Search.css'

export default function SearchInput(props) {
  return (
    <input
      className='SearchInput'
      type='text'
      onChange={props.handleChange}
      placeholder={props.placeHolder} />
  )
}

SearchInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  placeHolder: React.PropTypes.string
}
