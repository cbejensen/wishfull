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
          {props.price && <span style={styles.dollar}>$</span>}
          {props.price}
        </h3>
      </div>
      <div onClick={handleLink}>
        <a href={props.url}>Open link</a>
      </div>
    </div>
  );
};

export default FulfillmentHeader;
