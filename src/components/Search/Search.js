import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
    this.handleQuery = this.handleQuery.bind(this)
  }
  componentWillUnmount() {
    this.setState({query: ''})
  }
  handleQuery(e) {
    this.setState({query: e.target.value})
  }
  render() {
    let showResults = (this.state.query === '')
      ? false
      : true
    return (
      <div>
        <SearchInput
          type="text"
          handleChange={this.handleQuery}
          placeHolder={this.props.placeHolder} />
        {showResults && <SearchResults
          query={this.state.query}
          uid={this.props.uid} />}
      </div>
    )
  }
}

Search.propTypes = {
  uid: React.PropTypes.node,
  placeHolder: React.PropTypes.string
}

export default Search
