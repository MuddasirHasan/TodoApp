import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApiTodoScreen from '../../screens/ApiTodoScreen';

const Stack = createNativeStackNavigator();

function ApiTodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ApiTodoScreen" component={ApiTodoScreen} />
    </Stack.Navigator>
  );
}

export default ApiTodoStack;
