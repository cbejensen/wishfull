import React from 'react'
import { WishForm } from '../components/WishList'

export default function (props) {
  if (props.params.wishId) return (
    <WishForm uid={props.params.uid} wishId={props.params.wishId}/>
  )
  return <WishForm uid={props.params.uid} wishId={false}/>
}
