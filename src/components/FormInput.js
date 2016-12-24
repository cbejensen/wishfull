import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default function ({ getValidation, label, help, val, ...props }) {
  return (
    <FormGroup validationState={getValidation}>
      <ControlLabel>{label}{props.required && '*'}</ControlLabel>
      <FormControl value={val} style={{fontSize: '16px'}} {...props} />
      {getValidation && <FormControl.Feedback />}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
