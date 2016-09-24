import React from 'react';
import * as firebase from 'firebase';

const AddItemContainer = React.createClass({
  getInitialState() {
    return {
      title: '',
      price: '',
      importance: ''
    }
  },
  handleTitleChange(e) {
    this.setState({title: e.target.value})
  },
  handlePriceChange(e) {
    this.setState({price: e.target.value})
  },
  handleImportanceChange(e) {
    this.setState({importance: e.target.value})
  },

  render() {
    return <AddItem data={this.state.data}/>
  }
})

export function AddItem(props) {
  return (
    <div>
      <h2>Add Item</h2>
      <form>
        Title: <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}/>
        Price: <input
          type="text"
          value={this.state.title}
          onChange={this.handleTitleChange}/>
        Importance: <input type="text"/>
      </form>
    </div>
  );
}

export default AddItemContainer;
