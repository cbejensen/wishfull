import React from 'react';
import Fulfillment from './Fulfillment';
import { BoxList, ExpandingBox, BoxHeader, BoxBody } from 'components/BoxList';
import { FulfillmentHeader, FulfillmentBody } from 'components/Fulfillments';

const Fulfillments = props => {
  if (!props.wishes.length) {
    return <div>Wishes you fulfill will appear here.</div>;
  } else {
    return (
      <BoxList>
        {props.wishes.map((wish, index) => {
          const headerProps = {
            price: wish.price,
            title: wish.title,
            url: wish.url
          };
          const bodyProps = {
            description: wish.description,
            uid: props.uid,
            userId: wish.uid,
            wishId: wish.id
          };
          return (
            <ExpandingBox key={wish.id}>
              <BoxHeader>
                <FulfillmentHeader {...headerProps} />
              </BoxHeader>
              <BoxBody>
                <FulfillmentBody {...bodyProps} />
              </BoxBody>
            </ExpandingBox>
          );
        })}
      </BoxList>
    );
  }
};

Fulfillments.propTypes = {
  uid: React.PropTypes.node,
  wishes: React.PropTypes.array
};

export default Fulfillments;
