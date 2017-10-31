import React from 'react';
import { BoxList, ExpandingBox, BoxHeader, BoxBody } from 'components/BoxList';
import { FulfillmentHeader, FulfillmentBody } from 'components/Fulfillments';

const Fulfillments = props => {
  const styles = {
    noFulfillments: {
      fontSize: '2rem',
      textAlign: 'center',
      paddingTop: '20px'
    }
  };
  if (!props.wishes.length) {
    return (
      <div style={styles.noFulfillments}>
        Wishes you fulfill will appear here.
      </div>
    );
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
            handleUnfulfill: props.handleUnfulfill,
            index,
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
  handleUnfulfill: React.PropTypes.func.isRequired,
  wishes: React.PropTypes.array
};

export default Fulfillments;
