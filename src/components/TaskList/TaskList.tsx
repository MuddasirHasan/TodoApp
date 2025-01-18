import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteTask} from '../../store/taskSlice';
import {useStyle} from './Styles';

const styles = useStyle();

const TaskList = ({
  backgroundColor,
  title,
  description,
  date,
  time,
  readMore,
  remove,
  id, // Pass task ID as prop
}) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask(id)); // Dispatch deleteTask action with task ID
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={[styles.container, {backgroundColor: backgroundColor}]}>
        <Text style={styles.titleStyle} numberOfLines={1}>
          {title}
        </Text>
        {description && (
          <View style={styles.descriptionStyle}>
            <Text numberOfLines={1}>{description}</Text>
          </View>
        )}
        <View style={styles.timeDateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Text style={styles.symbol}>{' | '}</Text>
          <Text style={styles.timeText}>{time}</Text>
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
