import React from 'react'
import EditWishBtn from '../EditWishBtn'
import FulfillWishBtn from '../FulfillWishBtn'
import Fulfilled from '../Fulfilled'
import ItemBox from 'components/ItemBox'
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
      primaryColor: {
        color: this.props.primaryColor || '#2f2f2f'
      },
      secondaryColor: {
        color: this.props.secondaryColor || '#474747'
      },
      priorityText: {
        color: this.props.priorityColor,
        lineHeight: '1em'
      },
      hr: {
        // color: 'initial',
        margin: '5px 0 5px 0'
      }
    }
    if (this.props.mutable) {
      btn = <EditWishBtn uid={this.props.uid} id={this.props.wish.id}/>
    } else {
      btn = <FulfillWishBtn handleFulfill={this.props.handleFulfill}/>
    }
    if (this.props.showFulfilled && this.props.wish.fulfilled) {
      fulfilled = <Fulfilled uid={this.props.wish.fulfilled}/>
    }
    const handleClick = () => {
      this.props.handleSelectWish(this.props.index)
    }
    const setHeight = (type, elem) => {
      if (elem) this.props.setHeight(type, elem.offsetHeight)
    }
    return (
      <ItemBox
        style={styles.itemBox}
        colorTheme={this.props.priorityColor}
        selected={this.props.selected}
        handleClick={handleClick}>
        <div
          ref={header => setHeight('header', header)}
          id={"WishItem-header-" + this.props.index}>
          <div className="WishItem-priority-container">
            <div className="WishItem-priority-word" style={styles.secondaryColor}>
              PRIORITY
            </div>
            <div className="WishItem-priority" style={styles.priorityText}>
              {this.props.wish.priority}
            </div>
          </div>
          <div className="WishItem-title" style={styles.primaryColor}>
            {this.props.wish.title}
          </div>
          <div className="WishItem-price" style={styles.secondaryColor}>
            {this.props.wish.price
              ? `$${this.props.wish.price}`
              : ''}
            <span style={{
              marginLeft: 10
            }} onClick={this.props.openLink}>
              <a href={this.props.wish.url} target="_blank">Open link</a>
            </span>
          </div>
        </div>
        <div
          ref={body => setHeight('body', body)}
          id={"WishItem-body-" + this.props.index} style={styles.body}>
          <hr style={styles.hr}/>
          <div style={styles.primaryColor}>{this.props.wish.description}</div>
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