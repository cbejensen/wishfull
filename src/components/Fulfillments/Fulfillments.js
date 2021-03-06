import React from 'react';
import { BoxList, ExpandingBox, BoxHeader, BoxBody } from 'components/BoxList';
import { FulfillmentHeader, FulfillmentBody } from 'components/Fulfillments';

const Fulfillments = props => {
  const styles = {
    container: {
      maxWidth: '500px',
      margin: 'auto'
    },
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
      <div style={styles.container}>
        <BoxList>
          {props.wishes.map((wish, index) => {
            const headerProps = {
              pricePaid: wish.pricePaid,
              title: wish.title,
              url: wish.url,
              userId: wish.uid
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
      </div>
    );
  }
};

Fulfillments.propTypes = {
  handleUnfulfill: React.PropTypes.func.isRequired,
  wishes: React.PropTypes.array
};

export default Fulfillments;
