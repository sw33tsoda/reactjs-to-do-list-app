import React, { Component } from 'react';
import './App.css';
import './ToDoList.css';
import ToDoList from './components/ToDoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToDoList></ToDoList>
      </div>
    );
  }
}

export default App;
