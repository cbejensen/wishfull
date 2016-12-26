import React from 'react';
import { search } from 'utils/firebaseHelpers';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
    this.search = this.search.bind(this);
  }
  search(e) {
    if (e.target.value === '') return;
    // search(e.target.value, this.props.uid).then(res => {
    //   this.setState({
    //     results: res
    //   })
    // }, err => {
    //   console.log(err);
    // })
  }
  render() {
    // if (!this.state.text) return <SearchInput />
    return (
      <div>
        <input type="text" text={this.state.text} onChange={this.search}/>
      </div>
    )
  }
};

Search.propTypes = {
  uid: React.PropTypes.string.isRequired
}

export default Search;

/*

search result schema
[{
  type: user || group || wish
  title: string
  description: string
}]

*/
