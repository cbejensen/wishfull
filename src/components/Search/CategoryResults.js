import React from 'react'
import CategoryHeading from './CategoryHeading'
import { WishList } from 'components/WishList'
import { searchFriends } from 'utils/firebaseHelpers'

class WishResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: null
    }
    this.getResults = this.getResults.bind(this)
  }
  componentDidMount() {
    this.getResults()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.getResults()
    }
  }
  getResults() {
    searchFriends(this.props.query, this.props.uid)
    .then(results => {
      this.setState({results: results})
    }, err => {
      console.log(err)
    })
  }
  render() {
    if (!this.state.results) return null
    // let list = <UserList users={this.state.friends} />

    return React.cloneElement(this.props.children,
      {users: this.state.results})
  }
}

WishResults.propTypes = {
  query: React.PropTypes.string.isRequired,
  uid: React.PropTypes.string.isRequired
}

export default WishResults
