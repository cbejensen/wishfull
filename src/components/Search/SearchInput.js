import React from 'react'
import './Search.css'

class SearchInput extends React.Component {
  componentDidMount() {
    if (this.props.focusInput) this.textInput.focus()
  }
  render() {
    return (
      <input
        ref={e => {this.textInput = e}}
        className='SearchInput'
        type='text'
        onChange={this.props.handleChange}
        placeholder={this.props.placeHolder} />
    )
  }
}

SearchInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
  placeHolder: React.PropTypes.string,
  focusInput: React.PropTypes.bool
}

export default SearchInput
