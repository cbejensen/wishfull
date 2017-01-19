import React from 'react'
import './Search.css'

class SearchInput extends React.Component {
  render() {
    return (
      <input className="SearchInput"
        type="text"
        onChange={this.props.handleChange} />
    )
  }
}

SearchInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired
}

export default SearchInput
