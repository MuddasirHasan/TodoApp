import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalTodoScreen from '../../screens/LocalTodoScreen';
import ViewTodoScreen from '../../screens/ViewTodoScreen';

const Stack = createNativeStackNavigator();

function LocalTodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LocalTodoScreen" component={LocalTodoScreen} />
      <Stack.Screen name="ViewTodoScreen" component={ViewTodoScreen} />
    </Stack.Navigator>
  );
}

export default LocalTodoStack;
