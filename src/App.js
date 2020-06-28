import React, { Component }  from 'react';
import './App.css';
import AppRouter from './AppRouter';
// import { createStore } from 'redux';
// import {Provider} from 'react-redux';


export default class App extends Component {
  render() {
    return (
      <div>
          <AppRouter />
      </div>
    )
  }
}
