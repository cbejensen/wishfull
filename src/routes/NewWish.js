import React from 'react';
import FormInput from '../components/FormInput'
import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

const NewWishContainer = React.createClass({
  getInitialState() {
    return {
      title: '',
      description: '',
      link: '',
      price: '',
      priority: '',
      notes: ''
    }
  },
  handleChange(field, e) {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  },
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <FormInput label='Title'
        value={this.state.title}
        onChange={this.handleChange.bind(this, 'title')}
        />
      <FormInput label='Description'
        value={this.state.description}
        onChange={this.handleChange.bind(this, 'description')}
        help='Describe what the product is and why you want it'/>
      <FormInput label='Link'
        value={this.state.link}
        onChange={this.handleChange.bind(this, 'link')}
        />
      <FormInput label='Price'
        value={this.state.price}
        onChange={this.handleChange.bind(this, 'price')}
        />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl componentClass="select" placeholder="select">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9</option>
          <option value={10}>10</option>
        </FormControl>
      </FormGroup>
      <Button type="submit">Wish!</Button>
    </form>
    )
  }
});

export default NewWishContainer;
