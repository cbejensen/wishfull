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
  handleQuery(e) {
    this.setState({query: e.target.value})
  }
  // getUsers(query) {
  //
  // }
  // getWishes(query) {
  //
  // }
  render() {
    let showResults = this.state.query === '' ? false : true
    return (
      <div>
        <SearchInput type="text" handleChange={this.handleQuery}/>
        {showResults && <SearchResults categories={this.props.categories}
          query={this.state.query}
          uid={this.props.uid} />}
      </div>
    )
  }
}

Search.propTypes = {
  uid: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array
}

export default Search
