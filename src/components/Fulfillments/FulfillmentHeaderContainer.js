import React from 'react';
import FulfillmentHeader from './FulfillmentHeader';
import { getUser } from 'utils/firebaseHelpers';

class FulfillmentHeaderContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: null };
  }
  componentDidMount() {
    getUser(this.props.userId).then(
      user => {
        const name = `${user.firstName} ${user.lastName}`;
        this.setState({
          name
        });
      },
      err => {
        console.error(err);
      }
    );
  }
  render() {
    return <FulfillmentHeader name={this.state.name} {...this.props} />;
  }
}

export default FulfillmentHeaderContainer;
