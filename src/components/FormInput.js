import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';

export default function ({ validationState, label, help, val, ...props }) {
  return (
    <FormGroup validationState={validationState}>
      <ControlLabel>{label}{props.required && '*'}</ControlLabel>
      <FormControl value={val} style={{fontSize: '16px'}} {...props} />
      {validationState && <FormControl.Feedback />}
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}
