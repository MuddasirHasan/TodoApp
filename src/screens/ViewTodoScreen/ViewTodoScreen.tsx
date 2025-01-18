import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const styles = useStyle();

const ViewTodoScreen = () => {
  const {colors} = useColors();
  const navigation = useNavigation();
  const route = useRoute();
  const {item} = route?.params;

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);

    const ampm = hours >= 12 ? 'pm' : 'am';

    const formattedHours = hours % 12 || 12;

    return `${String(formattedHours).padStart(2, '0')} : ${String(
      minutes,
    ).padStart(2, '0')} ${ampm}`;
  }

  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      {/*header section */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/back.png')} />
        </TouchableOpacity>
        <Text style={styles.taskDetail}>Task Detail</Text>
      </View>
      {/*title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{item?.taskName}</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Image
              source={require('../../assets/miniCalender.png')}
              style={styles.miniCalenderStyle}
            />
            <Text style={styles.dateStyle}>{item?.date}</Text>
          </View>
          <Text style={styles.symbolStyle}>{' | '}</Text>
          <View style={styles.timeContainer}>
            <Image
              source={require('../../assets/miniClock.png')}
              style={styles.miniClockStyle}
            />
            <Text style={styles.timeStyle}>{formatTime(item?.time)}</Text>
          </View>
        </View>
      </View>
      {/*seprator Line */}
      <Image
        source={require('../../assets/seprator.png')}
        style={styles.sepratorStyle}
      />
      {/*Description  */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionStyle}>{item?.taskDescription}</Text>
      </View>
      {/*Button  */}
      <TouchableOpacity style={styles.btnContainer}>
        <Image
          source={require('../../assets/updateIcon.png')}
          style={styles.btnStyle}
        />
        <Text style={styles.updateStyle}>Update</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default ViewTodoScreen;
