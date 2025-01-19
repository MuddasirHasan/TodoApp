import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalTodoStack from '../LocalTodoStack/LocalTodoStack';
import ApiTodoStack from '../ApiTodoStack/ApiTodoStack';
import {useColors} from '../../hooks';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const {colors} = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary2,
        },
      }}>
      <Tab.Screen
        name="LocalTodoStack"
        component={LocalTodoStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-sharp" color={color} size={size} />
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name="ApiTodoStack"
        component={ApiTodoStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list-outline" color={color} size={size} />
          ),
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
