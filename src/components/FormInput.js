import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default function (props) {
  return (
    <FormGroup validationState={props.validationState}>
      <ControlLabel>{props.label}</ControlLabel>
      <FormControl
        type="text"
        value={props.val}
        onChange={props.handleChange} />
    </FormGroup>
  );
}
