import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { WishItem } from '../WishItem';
import AddWishBtn from '../AddWishBtn';

export function WishList(props) {
  const addWishBtn = (
    <div style={{textAlign: 'center'}}>
      <AddWishBtn uid={props.uid} />
    </div>
  )
  return (
    <Row style={{marginTop: '20px'}}>
      {/* <Col xs={3} style={{textAlign: 'center'}}>
        <ListFilter value={props.filter}
          onChange={props.handleFilterChange} />
      </Col>
      <Col xs={6}>
        <ListSearch text={props.search}
          onChange={props.handleSearchChange} />
      </Col> */}
      {props.mutable ? addWishBtn : null}
      {Object.keys(props.items).map((id, index) => {
        const item = props.items[id];
        return (
          <Col xs={12} key={id}>
            <WishItem uid={props.uid}
              item={item}
              id={id}
              index={index}
              mutable={props.mutable}
              showFulfilled={props.showFulfilled}/>
          </Col>
        )
      })}
    </Row>
  );
}

export default WishList;
