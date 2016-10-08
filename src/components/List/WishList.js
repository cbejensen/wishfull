import React from 'react';
import * as firebase from 'firebase';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';

import ListSearch from './ListSearch';
import ListFilter from './ListFilter';
import List from './List';

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      search: '',
      filter: '',
      items: {}
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
  return (
    <div>
      <ListSearch text={props.search}
        onChange={props.handleSearchChange} />
      <ListFilter value={props.filter}
        onChange={props.handleFilterChange} />
      <Button onClick={props.addItem}>+ Add Item</Button>
      <List items={props.items} />
    </div>
  );
}

export default WishListContainer;
