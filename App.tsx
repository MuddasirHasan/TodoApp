import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import AppStack from './src/navigation/AppStack/AppStack';

function App() {
  return (
    <NavigationContainer>
      <SplashScreen />
    </NavigationContainer>
  );
}

export default App;
