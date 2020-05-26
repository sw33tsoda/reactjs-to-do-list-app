import React, { Component } from 'react';
import './App.css';

import './ToDoList.css';
import ToDoList from './components/ToDoList';
import Welcome from './components/Welcome';
// import CharacterStats from './extra_components/CharacterStats';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Welcome></Welcome>
        <ToDoList></ToDoList>
      </div>
    );
  }
}

export default App;
