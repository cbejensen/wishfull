import React from 'react';
import ItemBox from 'components/ItemBox';

const Fulfillment = props => {
  return (
    <ItemBox>
      <h2>{props.title}</h2>
      {props.price}
    </ItemBox>
  );
};

export default Fulfillment;
