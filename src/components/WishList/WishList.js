import React from 'react';
import * as firebase from 'firebase';
import { Table } from 'react-bootstrap';

export function WishList(props) {
  const list = Object.keys(props.data).map(function(index) {
    const item = props.data[index];
    return (
      <tr key={index}>
        <td></td>
        <td>{item.title}</td>
        <td>{item.price}</td>
        <td>{item.added}</td>
        <td>{item.importance}</td>
      </tr>
    )
  });
  return (
    <div>
      <h1>My List</h1>
      <Table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Added</th>
            <th>Importance</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </Table>
    </div>
  );
}

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },

  componentDidMount() {
    const listData = firebase.database().ref().child('lists/cbejensen');
    listData.on('value', function(snapshot) {
      this.setState({
        data: snapshot.val()
      });
    }.bind(this));
  },

  render() {
    return <WishList data={this.state.data}/>
  }
})

export default WishListContainer;
