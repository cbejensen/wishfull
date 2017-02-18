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
    const {placeHolder, ...props} = this.props
    let showResults = (this.state.query === '')
      ? false
      : true
    return (
      <div>
        <SearchInput
          type="text"
          handleChange={this.handleQuery}
          placeHolder={placeHolder} />
        {showResults && <SearchResults
          {...props}
          query={this.state.query} />}
      </div>
    )
  }
}

Search.propTypes = {
  uid: React.PropTypes.node,
  placeHolder: React.PropTypes.string,
  excludeFriends: React.PropTypes.bool,
  excludeUsersNotFriends: React.PropTypes.bool,
  excludeWishes: React.PropTypes.bool,
  userNameColor: React.PropTypes.string,
  wishPrimaryColor: React.PropTypes.string,
  wishSecondaryColor: React.PropTypes.string
}

export default Search
