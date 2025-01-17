import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import AppStack from './src/navigation/AppStack/AppStack';

function App() {
  const [isSplashVisible, setSplashVisible] = useState(true); // State to control SplashScreen visibility

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); // Hide SplashScreen after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Clear the timer on unmount
  }, []);

  return (
    <NavigationContainer>
      {isSplashVisible ? <SplashScreen /> : <AppStack />}
    </NavigationContainer>
  );
}

export default App;
