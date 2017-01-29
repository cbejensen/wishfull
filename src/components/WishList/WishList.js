import React from 'react'
import {WishItem} from './WishItem'
import {getWishList} from 'utils/firebaseHelpers'
import * as firebase from 'firebase'

class WishList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wishes: 'loading',
      selectedWish: -1
    }
    this.handleSelectWish = this.handleSelectWish.bind(this)
  }
  componentDidMount() {
    if (this.props.wishes) {
      this.setState({wishes: this.props.wishes})
    } else {
      getWishList(this.props.uid).then(wishes => {
        // assign wish id to id prop
        for (let wishId in wishes) {
          if (wishes.hasOwnProperty(wishId)) {
            wishes[wishId].id = wishId
          }
        }
        // convert wishes from obj to array
        const wishesArray = Object.keys(wishes).map(wish => wishes[wish])
        this.setState({wishes: wishesArray})
      })
    }
  }
  handleSelectWish(wishIndex) {
    if (wishIndex === this.state.selectedWish) {
      // if user deselects wish already selected
      this.setState({selectedWish: -1})
    } else {
      this.setState({selectedWish: wishIndex})
    }
  }
  render() {
    if (this.state.wishes === 'loading') return (
      <div style={{textAlign: 'center'}}>Loading...</div>
    )
    if (!this.state.wishes) return (
      <div style={{textAlign: 'center'}}>
        <h3>No wishes yet!</h3>
      </div>
    )
    const styles = {
      wish: {
        margin: '5px auto'
      }
    }
    return (
      <div>
        {this.state.wishes.map((wish, index) => {
          let selected = (this.state.selectedWish === index) ? true : false
          return (
            <div style={styles.wish} key={wish.id}>
              <WishItem
                {...this.props}
                wish={wish}
                index={index}
                selected={selected}
                handleSelectWish={this.handleSelectWish} />
            </div>
          )
        })}
      </div>
    )
  }
}

WishList.propTypes = {
  uid: React.PropTypes.string.isRequired,
  wishes: React.PropTypes.array,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  showFulfilled: React.PropTypes.bool
}

export default WishList
