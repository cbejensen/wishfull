import React from 'react';

import ListSearch from './ListSearch';
import ListFilter from './ListFilter';
import Item from './Item';

const ListContainer = React.createClass({
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
    return <List {...this.state}
      handleSearchChange={this.handleSearchChange}
      handleFilterChange={this.handleFilterChange}/>
  }
});

export function List(props) {
  const items = Object.keys(props.data).map(function(index) {
    const item = props.data[index];
    return (
      <Item title={item.title} key={index}/>
    )
  });
  return (
    <div>
      <ListSearch text={props.search}
        onChange={props.handleSearchChange} />
      <ListFilter value={props.filter}
        onChange={props.handleFilterChange} />
      <br />Items:
      {items}
    </div>
  );
}

export default ListContainer;
