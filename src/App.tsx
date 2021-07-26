import React from 'react';
import { registerRootComponent } from 'expo';
import RootNavComponent from './components/navigation/RootNavComponent'

function App() {
  return <RootNavComponent/>
}

export default registerRootComponent(App);
