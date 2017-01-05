import React from 'react';

const CategoryResults = props => {
  return (
    <div>
      <ul>
        <li>{props.category}</li>
        {props.results.map((result, i) => {
          return <li key={i}>{props.results}</li>
        })}
      </ul>
    </div>
  )
};

CategoryResults.propTypes = {
  category: React.PropTypes.string.isRequired,
  results: React.PropTypes.array.isRequired
}

export default CategoryResults;
