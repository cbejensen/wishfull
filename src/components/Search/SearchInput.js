import React from 'react';

class SearchInput extends React.Component {
  render() {
    return (
      <input type="text" onChange={this.props.handleChange} />
    )
  }
};

SearchInput.propTypes = {
  handleChange: React.PropTypes.func.isRequired
}

export default SearchInput;
