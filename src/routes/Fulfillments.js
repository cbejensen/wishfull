import React from 'react';
import { Fulfillments as FulfillmentsComponent } from 'components/Fulfillments';
import CheckAuth from 'components/CheckAuth';
import { Grid } from 'react-bootstrap';

const Fulfillments = props => {
  return (
    <Grid>
      <CheckAuth redirect>
        <FulfillmentsComponent />
      </CheckAuth>
    </Grid>
  );
};

export default Fulfillments;
