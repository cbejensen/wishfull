import React from 'react';
import WishItemHeader from './WishItemHeader';
import WishItemBody from './WishItemBody';
import ItemBox from 'components/ItemBox';
import { fulfillWish } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class WishItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerHeight: '',
      bodyHeight: ''
    };
    this.setHeight = this.setHeight.bind(this);
    this.openLink = this.openLink.bind(this);
  }
  componentDidMount() {
    console.log('container mounted');
    this.setHeight();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.selected !== nextProps.selected) {
      this.setHeight();
    }
  }
  setHeight() {
    this.setState({
      headerHeight: this.header.offsetHeight + 22,
      bodyHeight: this.body.offsetHeight
    });
  }
  openLink(e) {
    // just follow link, don't expand/contract wish
    e.stopPropagation();
  }
  render() {
    const styles = {
      itemBox: {
        height: this.props.selected
          ? this.state.headerHeight + this.state.bodyHeight
          : this.state.headerHeight,
        maxWidth: '500px',
        transition: '0.3s ease-out'
      }
    };
    let priorityColor;
    switch (this.props.wish.priority) {
      case 1:
        priorityColor = 'rgb(255, 245, 0)';
        break;
      case 2:
        priorityColor = 'rgb(255, 220, 0)';
        break;
      case 3:
        priorityColor = 'rgb(255, 200, 0)';
        break;
      case 4:
        priorityColor = 'rgb(255, 175, 0)';
        break;
      case 5:
        priorityColor = 'rgb(255, 150, 0)';
        break;
      case 6:
        priorityColor = 'rgb(255, 125, 0)';
        break;
      case 7:
        priorityColor = 'rgb(255, 100, 0)';
        break;
      case 8:
        priorityColor = 'rgb(255, 80, 0)';
        break;
      case 9:
        priorityColor = 'rgb(255, 50, 0)';
        break;
      case 10:
        priorityColor = 'rgb(255, 0, 0)';
        break;
      default:
        priorityColor = 'rgb(67, 67, 67)';
    }
    return (
      <ItemBox
        style={styles.itemBox}
        colorTheme={priorityColor}
        selected={this.props.selected}
        handleClick={() => this.props.handleSelectWish(this.props.index)}
      >
        <div ref={header => (this.header = header)}>
          <WishItemHeader
            {...this.props}
            priorityColor={priorityColor}
            openLink={this.openLink}
            changeHeight={this.changeHeight}
            setHeight={this.setHeight}
            handleFulfill={this.handleFulfill}
          />
        </div>
        <div ref={body => (this.body = body)}>
          <WishItemBody
            {...this.props}
            priorityColor={priorityColor}
            openLink={this.openLink}
            changeHeight={this.changeHeight}
            setHeight={this.setHeight}
            handleFulfill={this.handleFulfill}
          />
        </div>
      </ItemBox>
    );
  }
}

WishItemContainer.propTypes = {
  wish: React.PropTypes.object.isRequired,
  uid: React.PropTypes.node.isRequired,
  index: React.PropTypes.number.isRequired,
  selected: React.PropTypes.bool.isRequired,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  handleSelectWish: React.PropTypes.func
};

export default WishItemContainer;
