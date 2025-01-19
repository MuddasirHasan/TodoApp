import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {deleteTask} from '../../store/taskSlice';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
const styles = useStyle();

const TaskList = ({
  backgroundColor,
  title,
  description,
  date,
  time,
  readMore,
  remove,
  id,
  item,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleDelete = () => {
    dispatch(deleteTask(id)); // Dispatch deleteTask action with task ID
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.container, {backgroundColor: backgroundColor}]}
        onPress={() => navigation.navigate('ViewTodoScreen', {item: item})}>
        {title && (
          <Text style={styles.titleStyle} numberOfLines={1}>
            {title}
          </Text>
        )}
        {description && (
          <View style={styles.descriptionStyle}>
            <Text numberOfLines={1}>{description}</Text>
          </View>
        )}
        <View style={styles.timeDateContainer}>
          {date && (
            <View style={styles.dateStyleContainer}>
              <Text style={styles.dateText}>{date}</Text>
            </View>
          )}

          {time && (
            <View style={styles.timeStyleContainer}>
              <Text style={styles.timeText}>{time}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {readMore && (
        <Image
          source={require('../../assets/more.png')}
          style={styles.moreIcon}
        />
      )}
      {remove && (
        <TouchableOpacity onPress={handleDelete}>
          <Image
            source={require('../../assets/bin.png')}
            style={styles.binStyle}
            tintColor={'white'}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TaskList;
