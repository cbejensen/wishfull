import React from 'react';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

class SearchContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.handleQuery = this.handleQuery.bind(this);
  }
  handleQuery(e) {
    this.setState({
      query: e.target.value
    })
  }
  render() {
    let showResults = this.state.query === '' ? false : true;
    return (
      <div>
        <SearchInput type="text" handleChange={this.handleQuery}/>
        {showResults && <SearchResults query={this.state.query}
          uid={this.props.uid}
          categories={this.props.categories} />}
      </div>
    )
  }
};

SearchContainer.propTypes = {
  uid: React.PropTypes.string.isRequired,
  categories: React.PropTypes.array
}

export default SearchContainer;
