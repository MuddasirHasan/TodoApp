import {Alert} from 'react-native';

export const ErrorHandler = (error: any) => {
  if (error?.message === 'Network Error') {
    return Alert.alert('Todo App', 'Please check your internet try again');
  }
};
