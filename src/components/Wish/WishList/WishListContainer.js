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
      selectedWish: -1,
      sort: 'priority',
      filter: '',
      ascending: false
    };
    this.handleSelectWish = this.handleSelectWish.bind(this);
    this.getList = this.getList.bind(this);
  }
  componentDidMount() {
    const listRef = firebase.database().ref(`lists/${this.props.uid}`);
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
  handleSelectWish(wishIndex) {
    if (wishIndex === this.state.selectedWish) {
      // if user deselects wish already selected
      this.setState({ selectedWish: -1 });
    } else {
      this.setState({ selectedWish: wishIndex });
    }
  }
  handleSort = e => {
    this.setState({
      sort: e.target.value,
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
    const bool = e.target.value == 'true';
    this.setState({ ascending: bool, selectedWish: -1 });
  };
  getList(props) {
    if (props.wishes) {
      this.setState({ wishes: props.wishes });
    } else {
      getWishList(props.uid).then(wishes => {
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
    const { wishes, ...propsToPass } = this.props;
    return (
      <div>
        {!this.props.fromSearch && (
          <WishListFilters
            sort={this.state.sort}
            filter={this.state.filter}
            ascending={this.state.ascending}
            handleSort={this.handleSort}
            handleFilter={this.handleFilter}
            handleAscending={this.handleAscending}
          />
        )}
        <WishList
          {...propsToPass}
          wishes={this.state.wishes}
          selected={this.state.selectedWish}
          sort={this.state.sort}
          filter={this.state.filter}
          ascending={this.state.ascending}
          handleSelectWish={this.handleSelectWish}
        />
      </div>
    );
  }
}

WishListContainer.propTypes = {
  uid: React.PropTypes.node.isRequired,
  wishes: React.PropTypes.array,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  fromSearch: React.PropTypes.bool
};

export default WishListContainer;
