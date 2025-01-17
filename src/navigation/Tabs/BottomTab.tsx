import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LocalTodoStack from '../LocalTodoStack/LocalTodoStack';
import ApiTodoStack from '../ApiTodoStack/ApiTodoStack';
import {useColors} from '../../hooks';
import Icon from 'react-native-vector-icons/Ionicons'; // Import your icon library

const Tab = createBottomTabNavigator();

function BottomTab() {
  const {colors} = useColors();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary2, // Tab background color
        },
      }}>
      <Tab.Screen
        name="LocalTodoStack"
        component={LocalTodoStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home-sharp" color={color} size={size} /> // Define your icon
          ),
          tabBarLabel: '', // Remove the label
        }}
      />
      <Tab.Screen
        name="ApiTodoStack"
        component={ApiTodoStack}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="list-outline" color={color} size={size} /> // Define your icon
          ),
          tabBarLabel: '', // Remove the label
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
