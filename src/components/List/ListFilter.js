import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const ListFilterContainer = React.createClass({
  componentDidMount() {
    console.log('got it')
  },
  render() {
    return <ListFilter />
  }
});

export function ListFilter(props) {
  return (
    <DropdownButton title="Filter" id="Filter WishList">
      <MenuItem>test</MenuItem>
      <MenuItem>test2</MenuItem>
      <MenuItem>t</MenuItem>
      <MenuItem>ty</MenuItem>
    </DropdownButton>
  );
}

export default ListFilterContainer;
