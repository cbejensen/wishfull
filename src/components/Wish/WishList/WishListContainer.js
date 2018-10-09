import React from 'react';
import WishList from './WishList';
import WishListFilters from './WishListFilters';
import { getWishList } from 'utils/firebaseHelpers';
import * as firebase from 'firebase';

class WishListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: 'loading',
      sortBy: 'priority',
      filter: '',
      ascending: false
    };
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    const listRef = firebase.database().ref(`lists/${this.props.userId}`);
    return listRef.on(
      'value',
      snap => {
        const wishes = snap.val();
        if (!wishes) {
          this.setState({ wishes: false });
          return;
        } else {
          // assign wish id to id prop
          for (let wishId in wishes) {
            if (wishes.hasOwnProperty(wishId)) {
              wishes[wishId].id = wishId;
            }
          }
          // convert wishes from obj to array
          const list = Object.keys(wishes).map(wish => wishes[wish]);
          this.setState({
            wishes: list
          });
        }
      },
      err => {
        throw err;
      }
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.getList(nextProps);
    }
  }
  handleSort = e => {
    this.setState({
      sortBy: e.target.value,
      selectedWish: -1
    });
  };
  handleFilter = e => {
    this.setState({
      filter: e.target.value,
      selectedWish: -1
    });
  };
  handleAscending = e => {
    // convert string to boolean
    const bool = e.target.value === 'true';
    this.setState({ ascending: bool, selectedWish: -1 });
  };
  getList(props) {
    if (props.wishes) {
      // if we received wishes prop,
      // just use that
      this.setState({ wishes: props.wishes });
    } else {
      // otherwise, get wishes from db
      getWishList(props.userId).then(wishes => {
        if (!wishes) {
          this.setState({ wishes: false });
          return;
        } else {
          // assign wish id to id prop
          for (let wishId in wishes) {
            if (wishes.hasOwnProperty(wishId)) {
              wishes[wishId].id = wishId;
            }
          }
          // convert wishes from obj to array
          const wishesArray = Object.keys(wishes).map(wish => wishes[wish]);
          this.setState({ wishes: wishesArray });
        }
      });
    }
  }
  render() {
    if (this.state.wishes === 'loading') {
      return <div style={{ textAlign: 'center' }}>Loading...</div>;
    } else if (!this.state.wishes) {
      return (
        <div style={{ textAlign: 'center' }}>
          <h3>No wishes yet!</h3>
        </div>
      );
    }
    const { wishes, fromSearch, ...propsToPass } = this.props;
    const maxWidth = '500px';
    return (
      <div>
        {!this.props.fromSearch && (
          <WishListFilters
            sortBy={this.state.sortBy}
            filter={this.state.filter}
            ascending={this.state.ascending}
            handleSort={this.handleSort}
            handleFilter={this.handleFilter}
            handleAscending={this.handleAscending}
            style={{maxWidth}}
          />
        )}
        <WishList {...this.state} {...propsToPass} style={{maxWidth}} />
      </div>
    );
  }
}

WishListContainer.propTypes = {
  userId: React.PropTypes.node,
  uid: React.PropTypes.node,
  wishes: React.PropTypes.array,
  mutable: React.PropTypes.bool,
  fromSearch: React.PropTypes.bool
};

export default WishListContainer;
