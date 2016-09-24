import React from 'react';
import WishList from '../components/WishList/WishList'

const Home = React.createClass({
  render() {
    console.log(this)
    return (
      <div>
        <h1>My Wish List</h1>
        <WishList />
      </div>
    );
  }
})

export default Home;
