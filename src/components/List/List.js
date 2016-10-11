import React from 'react';
import { Grid } from 'react-bootstrap';
import Item from './Item';

export default function List(props) {
  const items = Object.keys(props.items).map(index => {
    const item = props.items[index];
    return (
      <Item item={item} key={index}/>
    )
  });
  return <Grid>{items}</Grid>
}
