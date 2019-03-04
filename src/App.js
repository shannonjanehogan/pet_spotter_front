import React, { Component } from 'react';
import cat from './images/cat.svg';
import dog from './images/dog.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={cat} className="App-logo" alt="logo" />
          <span>PetSpotter</span>
          <img src={dog} className="App-logo" alt="logo" />
        </header>
        <div className="App-body">
          <p>
            connecting furry friends with loving owners!
          </p>
          <p className={"Buttons-text"}>
            I am a...
          </p>
        </div>
        <ButtonToolbar>
          <Button variant="info">Donor</Button>
          <Button variant="info">Pet owner</Button>
          <Button variant="info">Shelter volunteer</Button>
        </ButtonToolbar>
        <footer>
        Icon made by <a
          className={"App-link"}
          href={"https://www.flaticon.com/authors/freepik"}
          target="_blank">
          Freepik{" "}
        </a>
        from <a
          className={"App-link"}
          href={"https://flaticon.com"}
          target="_blank">
          Flaticon.com</a>
        </footer>
      </div>
    );
  }
}

export default App;
