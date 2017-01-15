import React from 'react';
import {getList} from 'utils/firebaseHelpers';

class UserBoxSubtitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wishCount: null}
  }
  componentDidMount() {
    getList(this.props.uid).then(list => {
      if (!list) list = {};
      const wishCount = Object.keys(list).length;
      this.setState({wishCount: wishCount})
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (this.state.wishCount === null) return null;
    return (
      <div className="text-muted" style={{fontSize: '.5em'}}>
        {`${this.state.wishCount} wishes`}
      </div>
    )
  }
};

UserBoxSubtitle.propTypes = {
  uid: React.PropTypes.string.isRequired
}

export default UserBoxSubtitle;
