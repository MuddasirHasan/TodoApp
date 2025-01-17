import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceOneScreen from '../../screens/onboarding/onboard1/ServiceOneScreen';
import ServiceTwoScreen from '../../screens/onboarding/onboard2/ServiceTwoScreen';
import ServiceThreeScreen from '../../screens/onboarding/onboard3/ServiceThreeScreen';
import BottomTab from '../Tabs/BottomTab';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ServiceOneScreen"
        component={ServiceOneScreen}
        options={{headerShown: false}} // Hide header
      />
      <Stack.Screen
        name="ServiceTwoScreen"
        component={ServiceTwoScreen}
        options={{headerShown: false}} // Hide header
      />
      <Stack.Screen
        name="ServiceThreeScreen"
        component={ServiceThreeScreen}
        options={{headerShown: false}} // Hide header
      />

      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
}

export default AppStack;
