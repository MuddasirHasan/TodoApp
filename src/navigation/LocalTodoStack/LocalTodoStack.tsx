import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LocalTodoScreen from '../../screens/LocalTodoScreen/LocalTodoScreen';
import ViewTodoScreen from '../../screens/ViewTodoScreen/ViewTodoScreen';

const Stack = createNativeStackNavigator();

function LocalTodoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create your Tasks"
        component={LocalTodoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="ViewTodoScreen" component={ViewTodoScreen} />
    </Stack.Navigator>
  );
}

export default LocalTodoStack;
