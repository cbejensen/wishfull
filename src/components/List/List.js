import React from 'react';
import { Grid } from 'react-bootstrap';
import Item from './Item';

export default function List(props) {
  const items = Object.keys(props.data).map(function(index) {
    const item = props.data[index];
    return (
      <Item item={item}/>
    )
  });
  return <Grid>{items}</Grid>
}
