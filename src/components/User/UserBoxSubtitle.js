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
    let wishCount = this.state.wishCount
    wishCount = (wishCount === 1) ? wishCount + ' wish' : wishCount + ' wishes'
    return (
      <div className="text-muted" style={{fontSize: '.5em'}}>
        {wishCount}
      </div>
    )
  }
}

UserBoxSubtitle.propTypes = {
  uid: React.PropTypes.node.isRequired
}

export default UserBoxSubtitle
