import React from 'react'
import { Button } from 'react-bootstrap'

export default function FulfillWishBtn(props) {
  return <Button onClick={props.handleFulfill}>Fulfill</Button>
}
