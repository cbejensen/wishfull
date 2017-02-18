import React from 'react'
import {makeCancelablePromise} from 'utils/functionHelpers'

class CategoryResults extends React.Component {
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
    this.setState({results: false})
    this.cancelablePromise = makeCancelablePromise(this.props.search())
    this.cancelablePromise.promise.then(res => {
      this.setState({results: res})
    }, err => {
      console.log(err)
    })
  }
  componentWillUnmount() {
    this.cancelablePromise.cancel()
  }
  render() {
    if (!this.state.results) {
      this.props.reportResults(false)
      return null
    } else if (this.state.results.length < 1) {
      this.props.reportResults([])
      return null
    } else {
      this.props.reportResults(true)
      return React.cloneElement(
        this.props.children, {results: this.state.results}
      )
    }
  }
}

CategoryResults.propTypes = {
  search: React.PropTypes.func.isRequired, // should be promise
  reportResults: React.PropTypes.func
}

export default CategoryResults
