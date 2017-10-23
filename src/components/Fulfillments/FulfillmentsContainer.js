import React from 'react';
import { getFufilledWishes } from 'utils/firebaseHelpers';
import Fulfillments from './Fulfillments';

class FulfillmentsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wishes: null };
  }
  componentDidMount() {
    getFufilledWishes(this.props.uid)
      .then(wishes => {
        // this.setState({ wishes: 'loading' });
        // const wishes = getMyFulfillments(lists, this.props.uid);
        this.setState({ wishes });
      })
      .catch(err => {
        this.setState({ wishes: false });
        console.error('ERROR', err);
      });
  }
  render() {
    if (this.state.wishes === null) {
      return null;
    } else if (this.state.wishes === 'loading') {
      return <div>Loading...</div>;
    } else if (!this.state.wishes) {
      // if there was an error
      return <div>Apologies - there was an error. Please try again later.</div>;
    } else {
      return <Fulfillments wishes={this.state.wishes} />;
    }
  }
}

export default FulfillmentsContainer;
