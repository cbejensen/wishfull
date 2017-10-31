import React from 'react';

const FulfillmentHeader = props => {
  const styles = {
    container: {
      display: 'flex'
    },
    title: {
      flex: 1,
      margin: 0
    },
    price: {
      flex: 0,
      margin: 0,
      alignSelf: 'center',
      color: '#e89925'
    },
    dollar: {
      fontVariant: 'all-petite-caps'
    }
  };
  const handleLink = e => {
    e.stopPropagation();
  };
  return (
    <div>
      <div style={styles.container}>
        <h2 style={styles.title}>{props.title}</h2>
        <h3 style={styles.price}>
          {props.pricePaid && <span style={styles.dollar}>$</span>}
          {props.pricePaid}
        </h3>
      </div>
      <span onClick={handleLink}>
        <a href={props.url} rel="noopener">
          Open link
        </a>
      </span>
    </div>
  );
};

export default FulfillmentHeader;
