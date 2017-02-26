import React from 'react'
import {WishItem} from './WishItem'
import {getWishList} from 'utils/firebaseHelpers'

class WishList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wishes: 'loading',
      selectedWish: -1
    }
    this.handleSelectWish = this.handleSelectWish.bind(this)
    this.getList = this.getList.bind(this)
  }
  componentDidMount() {
    this.getList(this.props)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getList(nextProps)
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
  getList(props) {
    if (props.wishes) {
      this.setState({wishes: props.wishes})
    } else {
      getWishList(props.uid).then(wishes => {
        if (!wishes) {
          this.setState({wishes: false})
          return
        } else {
          // assign wish id to id prop
          for (let wishId in wishes) {
            if (wishes.hasOwnProperty(wishId)) {
              wishes[wishId].id = wishId
            }
          }
          // convert wishes from obj to array
          const wishesArray = Object.keys(wishes).map(wish => wishes[wish])
          this.setState({wishes: wishesArray})
        }
      })
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
  uid: React.PropTypes.node.isRequired,
  wishes: React.PropTypes.array,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  showFulfilled: React.PropTypes.bool
}

export default WishList
