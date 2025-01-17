import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../../hooks';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
const styles = useStyle();

const ServiceOneScreen = () => {
  const {colors} = useColors();
  const navigation = useNavigation();

  const handleNext = () => {
    navigation.navigate('ServiceTwoScreen');
  };
  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      <Image
        source={require('../../../assets/note.png')}
        style={styles.image} // Add styles for the image
      />
      <Text style={styles.text}>
        Plan your tasks to do, that way you’ll stay organized and you won’t skip
        any
      </Text>
      <TouchableOpacity style={styles.btnBackground} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ServiceOneScreen;
