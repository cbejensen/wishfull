import React from 'react'
import {WishForm as Form} from 'components/Wish/WishForm'
import {Grid} from 'react-bootstrap'

const WishForm = props => {
  return (
    <Grid>
      <h1 style={{textAlign: 'center'}}>
        {props.params.wishId ? 'Edit Wish' : 'Create Wish'}
      </h1>
      <Form
        uid={props.params.uid}
        wishId={props.params.wishId || false}/>
    </Grid>
  )
}

export default WishForm
