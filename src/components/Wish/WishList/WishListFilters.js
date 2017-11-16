import React from 'react';

export default function WishListFilters(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <select
        value={props.sortBy}
        onChange={props.handleSort}
      >
        <option value="">Date Created</option>
        <option value="title">Title</option>
        <option value="priority">Priority</option>
        <option value="price">Price</option>
      </select>
      <input
        type="text"
        value={props.filter}
        onChange={props.handleFilter}
        placeholder="Max price"
        style={{ padding: '5px', margin: '0 10px' }}
      />
      <select
        value={props.ascending}
        onChange={props.handleAscending}
      >
        <option value="true">Ascending</option>
        <option value="false">Descending</option>
      </select>
    </div>
  );
}
