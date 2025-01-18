import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import AppStack from './src/navigation/AppStack/AppStack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';

const App = () => {
  const [isSplashVisible, setSplashVisible] = useState(true); // SplashScreen ka state

  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashVisible(false); // 4 seconds ke baad SplashScreen ko hide karna
    }, 4000);

    return () => clearTimeout(timer); // Timer ko cleanup karna
  }, []);

  return (
    // Redux Provider aur PersistGate ka wrapper
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          {isSplashVisible ? <SplashScreen /> : <AppStack />}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
