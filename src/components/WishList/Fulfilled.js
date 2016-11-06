import React from 'react';
import { getUser } from '../../utils/firebaseHelpers';

class FulfilledContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '...'
    }
  }
  componentDidMount() {
    getUser(this.props.uid).then(user => {
      const name = `${user.firstName} ${user.lastName}`;
      this.setState({
        name: name
      })
    }, err => {
      console.log(err);
    })
  }
  render() {
    return <Fulfilled name={this.state.name}/>
  }
};

export function Fulfilled(props) {
  return (
    <span>
      Fullfilled by {props.name}
    </span>
  );
}

export default FulfilledContainer;
