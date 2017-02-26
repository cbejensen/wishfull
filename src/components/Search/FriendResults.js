import React from 'react'
import CategoryHeading from './CategoryHeading'
import { UserList } from 'components/User'

class FriendResults extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      results: []
    }
    this.search = this.search.bind(this)
  }
  componentDidMount() {
    this.search()
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.query !== prevProps.query) {
      this.search()
    }
  }
  search() {
    let hasCanceled_ = false
    const wrappedPromise = new Promise((resolve, reject) => {
      this.props.search().then(
        res => hasCanceled_ ? reject({isCanceled: true}) : resolve(res),
        err => hasCanceled_ ? reject({isCanceled: true}) : reject(err)
      )
    })
    this.cancelablePromise = {
      promise: wrappedPromise,
      cancel() {
        hasCanceled_ = true
      },
    }
    this.cancelablePromise.promise.then(res => {
      this.setState({results: res})
    }, err => {
      console.log(err)
    })
  }
  componentWillUnmount() {
    // this.cancelablePromise.cancel()
  }
  render() {
    if (this.state.results.length < 1) return null
    return React.cloneElement(this.props.children, {results: this.state.results})
  }
}

FriendResults.propTypes = {
  search: React.PropTypes.func.isRequired
}

export default FriendResults
