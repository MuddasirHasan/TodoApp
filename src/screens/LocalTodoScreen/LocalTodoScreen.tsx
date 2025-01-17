import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const LocalTodoScreen = () => {
  const {colors} = useColors();
  return (
    <LinearGradient
      colors={[colors.primary5, colors.primary2]}
      style={styles.screen}>
      {/*search container */}
      <View style={styles.mainSearchContainer}>
        <View style={styles.searchViewContainer}>
          <View style={styles.searchContainer}>
            <TextInput style={styles.textInputStyle} />
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <Image source={require('../../assets/search.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.filterContainer}>
          <Image
            source={require('../../assets/filter.png')}
            tintColor={colors.iconColor}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default LocalTodoScreen;
