import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const ApiTodoScreen = () => {
  const {colors} = useColors();
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
