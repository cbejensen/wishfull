import React from 'react';

const FulfillmentBody = props => {
  const styles = {
    container: {
      paddingTop: '10px'
    },
    hr: {
      margin: '0 0 10px'
    }
  };
  return (
    <div style={styles.container}>
      <hr style={styles.hr} />
      <div>{props.description || 'No description'}</div>
    </div>
  );
};

export default FulfillmentBody;
