import React from 'react';

const NewWishContainer = React.createClass({
  
  render() {
    return <NewWish />
  }
});

export function NewWish(props) {
  return (
    <form>
      <input type="text"/>
      <input type="text"/>
      <input type="text"/>
      <input type="text"/>
      <input type="text"/>
    </form>
  );
}

export default NewWishContainer;
