import React from 'react';
import { View } from 'react-native';
import store  from './store'
import {Provider } from 'react-redux'
import Board from './src/Board'

export default function App() {
  return (
    <Provider store={store}>
        <Board />
    </Provider>
  );
}

