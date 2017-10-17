import React from 'react';
import { WishItem } from '../WishItem';

export default function WishList(props) {
  const styles = {
    wish: {
      margin: '5px auto'
    }
  };
  const { wishes, sort, filter, ascending, ...propsToPass } = props;
  let list = [...wishes];
  if (sort) {
    if (ascending) {
      list.sort((a, b) => (a[sort] <= b[sort] ? -1 : 1));
    } else {
      list.sort((a, b) => (a[sort] <= b[sort] ? 1 : -1));
    }
  }
  // currently the filter only acts as max price
  // TODO: make full-featured filter
  if (filter) {
    list = list.filter(wish => parseInt(wish.price) < filter || !wish.price);
  }
  if (!sort && !ascending) {
    list.reverse();
  }
  return (
    <div>
      {list.map((wish, index) => {
        let selected = props.selected === index ? true : false;
        return (
          <div style={styles.wish} key={wish.id}>
            <WishItem
              {...propsToPass}
              wish={wish}
              index={index}
              selected={selected}
            />
          </div>
        );
      })}
    </div>
  );
}

WishList.propTypes = {
  uid: React.PropTypes.node.isRequired,
  wishes: React.PropTypes.array,
  primaryColor: React.PropTypes.string,
  secondaryColor: React.PropTypes.string,
  mutable: React.PropTypes.bool,
  handleSelectWish: React.PropTypes.func,
  sort: React.PropTypes.node.isRequired,
  filter: React.PropTypes.node.isRequired
};
