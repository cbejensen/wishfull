import React from 'react';
import CategoryResults from './CategoryResults';
import { search } from 'utils/firebaseHelpers';

class CategoryResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    }
  }
  componentDidMount() {
    search(this.props.query, this.props.category, this.props.user.uid)
    .then(res => {
      console.log(res)
      this.setState({
        results: res
      })
    }, err => {
      console.log(err);
    })
  }
  render() {
    if (!this.state.results) return null;
    let title = this.props.category;
    title = title.charAt(0).toUpperCase() + title.slice(1);
    return <CategoryResults title={title} results={this.state.results} />
  }
};

CategoryResultsContainer.propTypes = {
  query: React.PropTypes.string.isRequired,
  category: React.PropTypes.string.isRequired,
  user: React.PropTypes.object.isRequired
}

export default CategoryResultsContainer;
