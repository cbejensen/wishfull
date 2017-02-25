import React from 'react'
import {WishForm as Form} from 'components/Wish'
import {Grid} from 'react-bootstrap'

const WishForm = props => {
  return (
    <Grid>
      <Form
        uid={props.params.uid}
        wishId={props.params.wishId ? props.params.wishId : false}/>
    </Grid>
  )
}

export default WishForm
