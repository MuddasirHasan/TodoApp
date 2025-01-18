import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
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
}) => {
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
        <TouchableOpacity>
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
