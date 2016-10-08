import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import { List, ListFilter, ListSearch } from './List';

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
    return <WishList {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}
      addItem={this.addItem}/>
  }
});

export function WishList(props) {
  if (props.items) return (
    <div>
      <ListSearch text={props.search}
        onChange={props.handleSearchChange} />
      <ListFilter value={props.filter}
        onChange={props.handleFilterChange} />
      <Button onClick={props.addItem}>New Wish</Button>
      <List items={props.items} />
    </div>
  );
  return (
    <div>
      No items in wish list yet!
      <Button onClick={props.addItem}>Make a Wish!</Button>
    </div>
  )
}

export default WishListContainer;
