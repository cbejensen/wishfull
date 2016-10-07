import React from 'react';

import { Grid } from 'react-bootstrap';

import ListSearch from './ListSearch';
import ListFilter from './ListFilter';
import List from './List';

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      search: '',
      filter: '',
      data: {}
    }
  },
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const itemsRef = firebase.database().ref('lists/' + user.uid);
        itemsRef.on('value', snap => {
          this.setState({
            data: snap.val()
          })
        });
      } else {
        // TODO: go to sign-in page
      }
    });
  },
  handleSearchChange(e) {
    this.setState({search: e.target.value});
  },
  handleFilterChange(e) {
    this.setState({filter: e.target.value});
  },
  render() {
    return <WishList {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}/>
  }
});

export function WishList(props) {
  return (
    <div>
      <ListSearch text={props.search}
        onChange={props.handleSearchChange} />
      <ListFilter value={props.filter}
        onChange={props.handleFilterChange} />
      <List data={props.data} />
    </div>
  );
}

export default WishListContainer;
