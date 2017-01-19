import React from 'react'
import { Table } from 'react-bootstrap'

const WishListContainer = React.createClass({
  getInitialState() {
    return {
      data: []
    }
  },
  render() {
    return <WishList data={this.state.data}/>
  }
})

export function WishList(props) {
  return (
    <div>
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
          {Object.keys(props.data).map(function(index) {
            const item = props.data[index]
            return (
              <tr key={index}>
                <td></td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>{item.added}</td>
                <td>{item.importance}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default WishListContainer
