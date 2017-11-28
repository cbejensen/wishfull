import React from 'react';
import { BoxList, ExpandingBox, BoxHeader, BoxBody } from 'components/BoxList';
import { WishHeader, WishBody } from 'components/Wish';

export default function WishList(props) {
  const styles = {
    container: {
      maxWidth: '500px',
      margin: 'auto'
    },
    wish: {
      margin: '5px auto'
    }
  };
  const getColor = priority => {
    let color;
    switch (priority) {
      case 1:
        color = 'rgb(255, 245, 0)';
        break;
      case 2:
        color = 'rgb(255, 220, 0)';
        break;
      case 3:
        color = 'rgb(255, 200, 0)';
        break;
      case 4:
        color = 'rgb(255, 175, 0)';
        break;
      case 5:
        color = 'rgb(255, 150, 0)';
        break;
      case 6:
        color = 'rgb(255, 125, 0)';
        break;
      case 7:
        color = 'rgb(255, 100, 0)';
        break;
      case 8:
        color = 'rgb(255, 80, 0)';
        break;
      case 9:
        color = 'rgb(255, 50, 0)';
        break;
      case 10:
        color = 'rgb(255, 0, 0)';
        break;
      default:
        color = 'rgb(67, 67, 67)';
    }
    return color;
  };
  const { wishes, sortBy, filter, ascending, ...otherProps } = props;
  let list = [...wishes];
  if (sortBy) {
    // if sorting by strings, we make them uppercase
    // to sort alphabetically properly
    const makeUpperCase = str => {
      return typeof str === 'string' ? str.toUpperCase() : str;
    };
    list.sort((aWish, bWish) => {
      const a = makeUpperCase(aWish[sortBy]);
      const b = makeUpperCase(bWish[sortBy]);
      return a <= b ? -1 : 1;
    });
  }
  // currently the filter only acts as max price
  // TODO: make full-featured filter
  if (filter) {
    list = list.filter(
      wish => parseInt(wish.price, 10) <= filter || !wish.price
    );
  }
  if (!ascending) {
    list.reverse();
  }
  return (
    <div style={styles.container}>
      <BoxList>
        {list.map(wish => {
          const color = getColor(wish.priority);
          const luminosity = props.luminosity || 'dark';
          const {
            comments,
            description,
            id,
            fulfilled,
            price,
            priority,
            title,
            url
          } = wish;
          const headerProps = {
            color: color,
            fulfilled,
            luminosity,
            price,
            priority,
            mutable: props.mutable,
            uid: props.uid,
            title,
            url
          };
          const bodyProps = {
            color: color,
            comments,
            description,
            fulfilled,
            luminosity,
            mutable: props.mutable,
            uid: props.uid,
            userId: props.userId,
            wishId: id
          };
          return (
            <ExpandingBox color={color} key={id}>
              <BoxHeader>
                <WishHeader {...headerProps} />
              </BoxHeader>
              <BoxBody>
                <WishBody {...bodyProps} />
              </BoxBody>
            </ExpandingBox>
          );
        })}
      </BoxList>
    </div>
  );
}

WishList.propTypes = {
  userId: React.PropTypes.node,
  uid: React.PropTypes.node,
  wishes: React.PropTypes.array,
  mutable: React.PropTypes.bool,
  handleSelectWish: React.PropTypes.func,
  sortBy: React.PropTypes.node.isRequired,
  filter: React.PropTypes.node.isRequired,
  ascending: React.PropTypes.bool.isRequired,
  luminosity: React.PropTypes.string
};
