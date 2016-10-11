import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import { List, ListFilter, ListSearch } from './List';

const newWishBtn = {
  position: 'absolute',
  right: '60px',
  top: '70px'
}

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      search: '',
      filter: '',
      items: null
    }
  },
  componentDidMount() {
    const path = `lists/${this.props.user.uid}`
    const itemsRef = firebase.database().ref(path);
    itemsRef.on('value', snap => {
      this.setState({
        items: snap.val()
      })
    });
  },
  handleSearchChange(e) {
    this.setState({search: e.target.value});
  },
  handleFilterChange(e) {
    this.setState({filter: e.target.value});
  },
  addItem() {
    const path = `/${this.props.user.uid}/new-wish`
    browserHistory.push(path)
  },
  render() {
    if (!this.state.items) return <div>Loading...</div>
    return <WishList {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      addItem={this.addItem}/>
  }
});

export function WishList(props) {
  let list;
  let btnText;
  if (props.items) {
    list = (
      <List items={props.items} /> ),
    btnText = 'Add Wish'
  } else {
    list = 'No wishes yet!',
    btnText = 'Make A Wish!'
  }
  return (
    <div>
      <Button onClick={props.addItem} style={newWishBtn}>{btnText}</Button>
      {list}
    </div>
  );
}

{/* <ListSearch text={props.search}
  onChange={props.handleSearchChange} />
<ListFilter value={props.filter}
  onChange={props.handleFilterChange} /> */}

export default WishListContainer;
