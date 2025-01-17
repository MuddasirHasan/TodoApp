import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalTodoStack from '../LocalTodoStack/LocalTodoStack';
import ApiTodoStack from '../ApiTodoStack/ApiTodoStack';
const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="LocalTodoStack" component={LocalTodoStack} />
      <Tab.Screen name="ApiTodoStack" component={ApiTodoStack} />
    </Tab.Navigator>
  );
}

export default BottomTab;
