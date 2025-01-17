import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceOneScreen from '../../screens/onboarding/onboard1/ServiceOneScreen';
import ServiceTwoScreen from '../../screens/onboarding/onboard2/ServiceTwoScreen';
import ServiceThreeScreen from '../../screens/onboarding/onboard3/ServiceThreeScreen';
import BottomTab from '../Tabs/BottomTab';

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ServiceOneScreen" component={ServiceOneScreen} />
      <Stack.Screen name="ServiceTwoScreen" component={ServiceTwoScreen} />
      <Stack.Screen name="ServiceThreeScreen" component={ServiceThreeScreen} />
      <Stack.Screen name="BottomTab" component={BottomTab} />
    </Stack.Navigator>
  );
}

export default AppStack;
