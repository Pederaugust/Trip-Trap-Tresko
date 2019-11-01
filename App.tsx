import React from 'react';
import { View } from 'react-native';
import store  from './store'
import {Provider } from 'react-redux'
import Game from './src/Game'

export default function App() {
  return (
    <Provider store={store}>
        <Game />
    </Provider>
  );
}

