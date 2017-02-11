import React from 'react'
import {getWishList} from 'utils/firebaseHelpers'
import {makeCancelablePromise} from 'utils/functionHelpers'

class UserBoxSubtitle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {wishCount: null}
  }
  componentDidMount() {
    this.cancelablePromise = makeCancelablePromise(getWishList(this.props.uid))
    this.cancelablePromise.promise.then(list => {
      if (!list) list = {}
      const wishCount = Object.keys(list).length
      this.setState({wishCount: wishCount})
    }, err => {})
  }
  componentWillUnmount() {
    this.cancelablePromise.cancel()
  }
  render() {
    if (this.state.wishCount === null) return null
    return (
      <div className="text-muted" style={{fontSize: '.5em'}}>
        {`${this.state.wishCount} wishes`}
      </div>
    )
  }
}

UserBoxSubtitle.propTypes = {
  uid: React.PropTypes.node.isRequired
}

export default UserBoxSubtitle
