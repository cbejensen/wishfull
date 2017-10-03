import React from 'react';
import FormInput from 'components/FormInput';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import { Link, browserHistory } from 'react-router';

export default function WishForm(props) {
  const styles = {
    form: {
      maxWidth: '500px',
      margin: 'auto'
    },
    btnRow: {
      textAlign: 'center',
      margin: '30px auto'
    },
    btn: {
      width: '100%',
      marginBottom: '20px'
    }
  };
  const cancel = () => {
    const confirmation = confirm('Are you sure you want to cancel?');
    if (confirmation) {
      browserHistory.push('home');
    }
  };
  const deleteWish = () => {
    const confirmation = confirm(
      'Are you sure you want to delete this wish? This action cannot be undone.'
    );
    if (confirmation) {
      props.handleDelete();
    }
  };
  const submitBtn = (
    <Col xs={props.wishId ? 12 : 6}>
      <Button bsStyle="primary" type="submit" style={styles.btn}>
        {props.wishId ? 'Save' : 'Submit'}
      </Button>
    </Col>
  );
  return (
    <form style={styles.form} onSubmit={props.handleSubmit}>
      <FormInput
        label="Title"
        autoFocus
        ref={e => focus(e)}
        value={props.title}
        onChange={props.handleChange.bind(null, 'title')}
        required
      />
      <FormInput
        label="Description"
        value={props.description}
        onChange={props.handleChange.bind(null, 'description')}
        componentClass="textarea"
        help="Describe what the product is and why you want it"
      />
      <FormInput
        label="URL"
        value={props.url}
        onChange={props.handleChange.bind(null, 'url')}
        getValidation={props.validateUrl()}
        placeholder="example.com"
        help="Copy and paste a link to this item on the web"
      />
      <FormInput
        label="Price"
        value={props.price}
        onChange={props.handleChange.bind(null, 'price')}
        getValidation={props.validatePrice()}
        help="Only whole numbers"
      />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl
          value={props.priority}
          onChange={props.handleChange.bind(null, 'priority')}
          componentClass="select"
          placeholder="select"
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </FormControl>
        <HelpBlock>
          1 = I barely want this <br />
          10 = I really want this
        </HelpBlock>
      </FormGroup>
      <Row style={styles.btnRow}>
        {props.wishId && submitBtn}
        {props.wishId && (
          <Col xs={6}>
            <Button bsStyle="danger" onClick={deleteWish} style={styles.btn}>
              Delete
            </Button>
          </Col>
        )}
        <Col xs={6}>
          <Button bsStyle="warning" onClick={cancel} style={styles.btn}>
            Cancel
          </Button>
        </Col>
        {!props.wishId && submitBtn}
      </Row>
    </form>
  );
}
