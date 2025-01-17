import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const SplashScreen = () => {
  const {colors} = useColors();
  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      <Image
        source={require('../../assets/Checkmark.png')}
        style={styles.image} // Add styles for the image
      />
      <Text style={styles.text}>Just Do IT</Text>
    </LinearGradient>
  );
};

export default SplashScreen;
