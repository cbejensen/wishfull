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
    },
    maxPriceContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 0,
      paddingRight: 0,
      minWidth: 160,
      whiteSpace: 'nowrap',
      border: 'none'
    },
    maxPriceInput: {
      flex: 1,
      width: '100%',
      marginLeft: 3,
      border: 'none',
      borderBottom: '1px solid black'
    },
    bolderBiggerText: {
      fontSize: '1.2em',
      fontWeight: 'bold',
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
      <select
        value={props.ascending}
        onChange={props.handleAscending}
        style={styles.filter}
      >
        <option value="true">Ascending</option>
        <option value="false">Descending</option>
      </select>
      <div style={{...styles.filter, ...styles.maxPriceContainer}}>
        <span>Max Price: <span style={{...styles.bolderBiggerText, marginLeft: 5}}>$</span></span>
        <input
          type="number"
          value={props.filter}
          onChange={props.handleFilter}
          style={{...styles.maxPriceInput, ...styles.bolderBiggerText}}
        />
      </div>
    </div>
  );
}
