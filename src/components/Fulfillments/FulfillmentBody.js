import React from 'react';
import { Button } from 'react-bootstrap';
import { updateFulfillment } from 'utils/firebaseHelpers';

const FulfillmentBody = props => {
  const styles = {
    container: {
      paddingTop: '10px'
    },
    hr: {
      margin: '0 0 10px'
    },
    btn: {
      textAlign: 'right'
    }
  };
  const unfulfill = e => {
    e.stopPropagation();
    const confirmation = confirm(
      'Are you sure you want to unfulfill this wish?'
    );
    if (confirmation) {
      updateFulfillment(props.userId, props.wishId, props.uid, false)
        .then(res => {
          props.handleUnfulfill(props.index);
        })
        .catch(err => console.error(err));
    }
  };
  return (
    <div style={styles.container}>
      <hr style={styles.hr} />
      <div>{props.description || 'No description'}</div>
      <div style={styles.btn}>
        <Button bsStyle="danger" onClick={unfulfill}>
          Unfulfill
        </Button>
      </div>
    </div>
  );
};

FulfillmentBody.propTypes = {
  handleUnfulfill: React.PropTypes.func.isRequired,
  index: React.PropTypes.number.isRequired
};

export default FulfillmentBody;
