import React from 'react';
import FormInput from '../components/FormInput';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { addWish } from '../utils/firebaseHelpers';
import { browserHistory } from 'react-router';

const NewWishContainer = React.createClass({
  getInitialState() {
    return {
      title: '',
      description: '',
      link: '',
      price: 0,
      priority: 1,
    }
  },
  handleChange(field, e) {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  },
  handleSubmit(e) {
    e.preventDefault();
    addWish(this.state, this.props.params.user).then(res => {
      console.log(res)
      browserHistory.push(`/${this.props.params.user}`)
    }, err => {
      alert(err)
    })
  },
  render() {
    return (
    <form onSubmit={this.handleSubmit}>
      <FormInput label='Title'
        value={this.state.title}
        onChange={this.handleChange.bind(this, 'title')}
        required />
      <FormInput label='Description'
        value={this.state.description}
        onChange={this.handleChange.bind(this, 'description')}
        help='Describe what the product is and why you want it' />
      <FormInput label='Link'
        value={this.state.link}
        onChange={this.handleChange.bind(this, 'link')}
        placeholder='http://example.com'
        help='Copy and paste a URL link to this item on the web' />
      <FormInput label='Price'
        value={this.state.price}
        onChange={this.handleChange.bind(this, 'price')}
        help='Do not include a dollar sign' />
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
        <HelpBlock>
          1 = I barely even want this <br />
          10 = I practically need this to survive
        </HelpBlock>
      </FormGroup>
      <Button type="submit">Wish!</Button>
    </form>
    )
  }
});

export default NewWishContainer;
