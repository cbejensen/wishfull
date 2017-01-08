import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { WishItem } from '../WishItem';
import AddWishBtn from 'components/Button/AddWishBtn';
import ItemBox from 'components/ItemBox';

export function WishList(props) {
  return (
    <Row style={{marginTop: '20px'}}>
      {props.wishes.map((wish, index) => {
        let selected = (props.selectedWish === index) ? true : false;
        return (
          <Col xs={12} key={wish.id}>
            <WishItem {...props}
              wish={wish}
              id={wish.id}
              index={index}
              selected={selected} />
          </Col>
        )
      })}
    </Row>
  );
}

WishList.propTypes = {
  wishes: React.PropTypes.array.isRequired,
  uid: React.PropTypes.string.isRequired,
  showFulfilled: React.PropTypes.bool,
  mutable: React.PropTypes.bool,
  selectedWish: React.PropTypes.number,
  handleSelectWish: React.PropTypes.func
}

export default WishList;
