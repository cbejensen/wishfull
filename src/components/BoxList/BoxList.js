import React from 'react';
import ExpandingBox from './ExpandingBox';

class BoxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1
    };
  }
  handleClick = itemIndex => {
    if (itemIndex === this.state.selectedItem) {
      // if user deselects wish already selected
      this.setState({ selectedItem: -1 });
    } else {
      this.setState({ selectedItem: itemIndex });
    }
  };
  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, index) =>
          React.cloneElement(child, {
            selected: this.state.selectedItem === index,
            index,
            handleClick: this.handleClick,
            styles: {
              margin: '5px auto'
            }
          })
        )}
      </div>
    );
  }
}

export default BoxList;
