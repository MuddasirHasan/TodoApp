import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../../hooks';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
const styles = useStyle();

const ServiceThreeScreen = () => {
  const {colors} = useColors();
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('BottomTab');
  };
  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      <Image
        source={require('../../../assets/secure.png')}
        style={styles.image}
      />
      <Text style={styles.text}>You informations are secure with us</Text>
      <TouchableOpacity style={styles.btnBackground} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ServiceThreeScreen;
