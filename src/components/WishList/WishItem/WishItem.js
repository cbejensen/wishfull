import React from 'react'
import EditWishBtn from '../EditWishBtn'
import FulfillWishBtn from '../FulfillWishBtn'
import Fulfilled from '../Fulfilled'
import ItemBox from 'components/ItemBox'
import {Row, Col} from 'react-bootstrap'
import './WishItem.css'

class WishItem extends React.Component {
  render() {
    let btn, fulfilled
    const styles = {
      itemBox: {
        height: this.props.height,
        transition: '0.3s ease-out'
      },
      body: {
        visibility: this.props.selected
          ? 'visible'
          : 'hidden',
        opacity: this.props.selected
          ? '1'
          : '0',
        transition: '.3s ease-out'
      },
      priorityText: {
        color: this.props.priorityColor,
        lineHeight: '1em'
      }
    }
    if (this.props.mutable) {
      btn = <EditWishBtn uid={this.props.uid} id={this.props.id}/>
    } else {
      btn = <FulfillWishBtn handleFulfill={this.props.handleFulfill}/>
    }
    if (this.props.showFulfilled && this.props.wish.fulfilled) {
      fulfilled = <Fulfilled uid={this.props.wish.fulfilled}/>
    }
    const handleClick = () => {
      if (this.props.handleSelectWish) {
        this.props.handleSelectWish(this.props.index)
      }
    }
    return (
      <ItemBox styles={styles.itemBox}
        colorTheme={this.props.priorityColor}
        selected={this.props.selected}
        handleClick={handleClick}>
        <div id={"WishItem-header-" + this.props.index}>
          <div className="WishItem-priority-container">
            <div className="WishItem-priority-word"
              style={{color: this.props.secondaryColor && this.props.secondaryColor}}>
              PRIORITY
            </div>
            <div className="WishItem-priority"
              style={styles.priorityText}>
              {this.props.wish.priority}
            </div>
          </div>
          <div className="WishItem-title"
            style={{color: this.props.primaryColor && this.props.primaryColor}}>
            {this.props.wish.title}
          </div>
          <div className="WishItem-price"
            style={{color: this.props.secondaryColor && this.props.secondaryColor}}>
            {this.props.wish.price
              ? `$${this.props.wish.price}`
              : ''}
            <span style={{marginLeft: 10}} onClick={this.props.openLink}>
              <a href={this.props.wish.url} target="_blank">Open link</a>
            </span>
          </div>
        </div>
        <div id={"WishItem-body-" + this.props.index}
          style={styles.body}>
          <hr style={{
            margin: '0 0 10px 0'
          }}/> {this.props.wish.description}
          <div className="WishItem-fulfilled" style={styles.priorityText}>
            {fulfilled}
          </div>
          <div className="WishItem-btn-group">
            {btn}
          </div>
        </div>
      </ItemBox>
    )
  }
}

export default WishItem
