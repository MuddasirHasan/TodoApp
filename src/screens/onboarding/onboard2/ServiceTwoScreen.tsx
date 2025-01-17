import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../../hooks';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
const styles = useStyle();

const ServiceTwoScreen = () => {
  const {colors} = useColors();
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('ServiceThreeScreen');
  };
  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      <Image
        source={require('../../../assets/calender.png')}
        style={styles.image} // Add styles for the image
      />
      <Text style={styles.text}>
        Make a full schedule for the whole week and stay organized and
        productive all days
      </Text>
      <TouchableOpacity style={styles.btnBackground} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ServiceTwoScreen;
