import React from 'react';
import Header from './Header/Header';
import { Search } from '../Search';
import { Flipper, FlipperFront, FlipperBack } from '../Flipper';
import './App.css';

class App extends React.Component {
  render() {
    let flipped = false;
    let flipDirection = 'right';
    let backContent;
    if (this.props.showMenu || this.props.showSearch) {
      flipped = true;
      if (this.props.showMenu) {
        backContent = <div>Menu</div>;
        flipDirection = 'left';
      } else {
        backContent = <Search />;
      };
    } else {
      flipped = false;
    }
    return (
      <div>
        <Header {...this.props} />
        <div className="App-main-container">
          <Flipper flipped={flipped} flipDirection={flipDirection}>
            <FlipperFront>
              <div className="App-shadow-top"></div>
              {this.props.children}
            </FlipperFront>
            <FlipperBack>
              <div className="App-shadow-top"></div>
              {backContent}
            </FlipperBack>
          </Flipper>
        </div>
      </div>
    )
  }
};

export default App;
