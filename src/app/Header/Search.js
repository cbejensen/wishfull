import React from 'react';

const style = {
  searchBar: {
    width: '100%',
    padding: '0 10px',
    fontSize: '18px',
    border: '1px solid black'
  }
}

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({search: e.target.value})
  }
  render() {
    return <SearchBar handleChange={this.handleChange}/>
  }
};

export function SearchBar(props) {
  return <input type="text" style={style.searchBar} onChange={props.handleChange}/>
}

export default Search;
