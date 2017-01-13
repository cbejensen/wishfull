import React from 'react';
import {getList} from 'utils/firebaseHelpers';

class UserHeadingSubtitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wishCount: null}
  }
  componentDidMount() {
    getList(this.props.uid).then(list => {
      if (!list) list = {};
      console.log(list)
      const wishCount = Object.keys(list).length;
      console.log(wishCount)
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

UserHeadingSubtitle.propTypes = {
  uid: React.PropTypes.string.isRequired
}

export default UserHeadingSubtitle;
