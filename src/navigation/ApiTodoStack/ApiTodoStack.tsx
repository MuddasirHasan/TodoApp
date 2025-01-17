import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ApiTodoScreen from '../../screens/ApiTodoScreen/ApiTodoScreen';

const Stack = createNativeStackNavigator();

function ApiTodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ApiTodoScreen"
        component={ApiTodoScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default ApiTodoStack;
