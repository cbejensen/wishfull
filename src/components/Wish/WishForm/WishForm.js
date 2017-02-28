import React from 'react'
import FormInput from 'components/FormInput'
import {FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Grid,
  Row,
  Col,
  Button} from 'react-bootstrap'
import {Link} from 'react-router'

export default function WishForm(props) {
  const styles = {
    form: {
      maxWidth: '500px',
      margin: 'auto'
    }
  }
  return (
    <form style={styles.form} onSubmit={props.handleSubmit}>
      <FormInput label='Title'
        autoFocus
        ref={e => focus(e)}
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
        getValidation={props.validateUrl()}
        placeholder='example.com'
        help='Copy and paste a link to this item on the web' />
      <FormInput label='Price'
        value={props.price}
        onChange={props.handleChange.bind(null, 'price')}
        getValidation={props.validatePrice()}
        help='Only whole numbers' />
      <FormGroup>
        <ControlLabel>Priority</ControlLabel>
        <FormControl value={props.priority}
          onChange={props.handleChange.bind(null, 'priority')}
          componentClass="select"
          placeholder="select">
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
          1 = I barely even want this <br />
          10 = I practically need this to survive
        </HelpBlock>
      </FormGroup>
      <Grid>
        <Row style={{textAlign: 'center'}}>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Button bsStyle="primary" type="submit">Save</Button>
          </Col>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Link to='/home'>
              <Button bsStyle="warning">Cancel</Button>
            </Link>
          </Col>
          <Col xs={12} sm={4} style={{marginBottom: '30px'}}>
            <Button bsStyle="danger" onClick={props.handleDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Grid>
    </form>
  )
}
