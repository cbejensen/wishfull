import React from 'react';

const searchStyle = {
  width: '100%',
}

const ListSearchContainer = React.createClass({

  render() {
    return <ListSearch />
  }
});

export function ListSearch(props) {
  return (
    <input style={searchStyle}
      placeholder="Search" />
  );
}

export default ListSearchContainer;
