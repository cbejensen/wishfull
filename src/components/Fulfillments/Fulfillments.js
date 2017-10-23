import React from 'react';
import Fulfillment from './Fulfillment';

const Fulfillments = props => {
  if (!props.wishes.length) {
    return <div>Wishes you fulfill will appear here.</div>;
  } else {
    console.dir(props.wishes);
    return (
      <div>
        {props.wishes.map(wish => {
          return <Fulfillment {...wish} />;
        })}
      </div>
    );
  }
};

export default Fulfillments;
