import React from 'react'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }
  componentWillUnmount() {
    this.setState({query: ''})
  }
  handleQueryChange(e) {
    const query = e.target.value
    this.setState({query: query})
    if (this.props.handleQueryChange) this.props.handleQueryChange(query)
  }
  render() {
    const {placeHolder, ...props} = this.props
    let showResults = (this.state.query === '')
      ? false
      : true
    return (
      <div>
        <SearchInput
          focusInput={this.props.focusInput}
          handleChange={this.handleQueryChange}
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
  wishSecondaryColor: React.PropTypes.string,
  handleQueryChange: React.PropTypes.func,
  focusInput: React.PropTypes.bool
}

export default Search
