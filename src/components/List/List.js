import React from 'react';
import { Grid } from 'react-bootstrap';
import Item from './Item';

export default function List(props) {
  const items = Object.keys(props.items).map(key => {
    const item = props.items[key];
    return (
      <Item item={item} key={key} id={key} editItem={props.editItem}/>
    )
  });
  return <Grid>{items}</Grid>
}
