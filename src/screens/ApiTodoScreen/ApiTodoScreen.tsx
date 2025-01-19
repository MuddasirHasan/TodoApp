import {StyleSheet, Text, View, Image, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {UseDispatch, useDispatch} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {getTodos} from '../../store/GetTodosSlice';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const ApiTodoScreen = () => {
  const {colors} = useColors();
  const dispatch = useDispatch();
  const getTodosApi = async () => {
    try {
      const response = await dispatch(getTodos()).unwrap(); // Use unwrap for clean access
      console.log('Fetched Todos:', response); // Logs the todos array
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos. Please try again.');
    }
  };

  useEffect(() => {
    getTodosApi();
  }, []);
  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      {/*Title Container */}
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/view-list.png')}
          style={styles.logoStyle}
          tintColor={colors.white}
        />
        <Text style={styles.titleStyle}>Fetch Todos</Text>
      </View>
    </LinearGradient>
  );
};

export default ApiTodoScreen;
