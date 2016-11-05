import React from 'react';
import { Grid } from 'react-bootstrap';
import WishItem from './WishItem';

export default function WishList(props) {
  const items = Object.keys(props.items).map(id => {
    const item = props.items[id];
    return (
      <WishItem uid={props.uid} item={item} key={id} id={id} mutable={props.mutable}/>
    )
  });
  return <Grid>{items}</Grid>
}
