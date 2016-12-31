import React from 'react';

class CategoryResults extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>{this.props.title}</li>
          {this.props.results.map((result, i) => {
            return <li key={i}>{result.title}</li>
          })}
        </ul>
      </div>
    )
  }
};

CategoryResults.propTypes = {
  title: React.PropTypes.string.isRequired,
  results: React.PropTypes.array.isRequired
}

export default CategoryResults;
