import React from 'react';
import FormInput from '../components/FormInput';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { addWish, updateWish, getList, getWish } from '../utils/firebaseHelpers';
import { browserHistory } from 'react-router';

const NewWishContainer = React.createClass({
  getInitialState() {
    return {
      title: '',
      description: '',
      url: '',
      price: '',
      priority: 1
    }
  },
  componentDidMount() {
    if (this.props.params.wish) {
      getWish(this.props.params.uid, this.props.params.wish).then(wish => {
        this.setState({
          title: wish.title,
          description: wish.description,
          url: wish.url,
          price: wish.price,
          priority: wish.priority
        })
      }, err => {
        browserHistory.push('/home');
      })
    }
  },
  handleChange(field, e) {
    const newState = {};
    newState[field] = e.target.value;
    this.setState(newState);
  },
  handleSubmit(e) {
    e.preventDefault();
    if (this.props.params.wish) {
      updateWish(this.props.params.uid, this.props.params.wish, this.state)
      .then(res => {
        browserHistory.push('/home');
      }, err => {
        alert('There was an error processing your request. Please try again.');
      })
    } else {
      addWish(this.state, this.props.params.uid).then(res => {
        browserHistory.push(`/${this.props.params.uid}`)
      }, err => {
        alert(err)
      })
    }

  },
  render() {
    return <NewWish {...this.state}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit} />
  }
});

export function NewWish(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      <FormInput label='Title'
        value={props.title}
        onChange={props.handleChange.bind(null, 'title')}
        required />
      <FormInput label='Description'
        value={props.description}
        onChange={props.handleChange.bind(null, 'description')}
        componentClass="textarea"
        help='Describe what the product is and why you want it' />
      <FormInput label='URL'
        value={props.url}
        onChange={props.handleChange.bind(null, 'url')}
        placeholder='example.com'
        help='Copy and paste a link to props item on the web' />
      <FormInput label='Price'
        value={props.price}
        onChange={props.handleChange.bind(null, 'price')}
        help='Do not include a dollar sign' />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl value={props.priority}
          onChange={props.handleChange.bind(null, 'priority')}
          componentClass="select"
          placeholder="select">
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

export default NewWishContainer;
