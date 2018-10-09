import React from 'react';

export default function WishListFilters(props) {
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: 'auto',
      ...props.style
    },
    filter: {
      flex: 1,
      padding: 10,
      margin: 10,
      webkitAppearance: 'none',
      mozAppearance: 'none',
      border: '1px solid black'
    }
  }
  return (
    <div style={styles.container}>
      <select
        value={props.sortBy}
        onChange={props.handleSort}
        style={styles.filter}
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
        style={{...styles.filter, maxWidth: '100%', borderTop: 0, borderRight: 0, borderLeft: 0}}
      />
      <select
        value={props.ascending}
        onChange={props.handleAscending}
        style={styles.filter}
      >
        <option value="true">Ascending</option>
        <option value="false">Descending</option>
      </select>
    </div>
  );
}
