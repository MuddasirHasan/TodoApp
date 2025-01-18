import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {updateTask} from '../../store/taskSlice';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
const styles = useStyle();

const parseDate = dateString => {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day);
};

const parseTime = timeString => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const ViewTodoScreen = () => {
  const route = useRoute();
  const {item} = route?.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState(item?.taskName);
  const [taskDescription, setTaskDescription] = useState(item?.taskDescription);
  const [taskDate, setTaskDate] = useState(
    item?.date ? parseDate(item.date) : new Date(),
  );
  const [taskTime, setTaskTime] = useState(
    item?.time ? parseTime(item.time) : new Date(),
  );

  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const {colors} = useColors();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log('my item => ', item);

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);

    const ampm = hours >= 12 ? 'pm' : 'am';

    const formattedHours = hours % 12 || 12;

    return `${String(formattedHours).padStart(2, '0')} : ${String(
      minutes,
    ).padStart(2, '0')} ${ampm}`;
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleUpdateTask = () => {
    if (taskTitle && taskDescription && taskDate && taskTime) {
      dispatch(
        updateTask({
          id: item.id, // Pass task ID
          taskName: taskTitle,
          taskDescription,
          date: taskDate.toLocaleDateString(),
          time: taskTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }),
        }),
      );
      toggleModal();
      navigation.goBack(); // Navigate back after updating
    } else {
      alert('Please fill in all fields');
    }
  };

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
      <TouchableOpacity style={styles.btnContainer} onPress={toggleModal}>
        <Image
          source={require('../../assets/updateIcon.png')}
          style={styles.btnStyle}
        />
        <Text style={styles.updateStyle}>Update</Text>
      </TouchableOpacity>

      {/*Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Update Your Task</Text>
          {/* Task Title */}
          <TextInput
            style={styles.modalInput}
            placeholder="Task Title"
            placeholderTextColor={colors.placeholderColor}
            value={taskTitle}
            onChangeText={setTaskTitle}
          />
          {/* Task Description */}
          <TextInput
            style={styles.modalInputDes}
            placeholder="Task Description"
            placeholderTextColor={colors.placeholderColor}
            multiline
            textAlignVertical="top"
            value={taskDescription}
            onChangeText={setTaskDescription}
            maxLength={50}
          />

          {/* Date and Time Fields */}
          <View style={styles.dtContainer}>
            <TouchableOpacity
              style={styles.dateContainer1}
              onPress={() => setDatePickerVisible(true)}>
              <Image source={require('../../assets/dateIcon.png')} />
              <Text style={styles.dateStyle1}>
                {taskDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateContainer1}
              onPress={() => setTimePickerVisible(true)}>
              <Image source={require('../../assets/timeIcon.png')} />
              <Text style={styles.dateStyle1}>
                {taskTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true,
                })}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker */}
          <DatePicker
            modal
            open={isDatePickerVisible}
            date={taskDate}
            mode="date"
            onConfirm={date => {
              setDatePickerVisible(false);
              setTaskDate(date);
            }}
            onCancel={() => setDatePickerVisible(false)}
          />

          {/* Time Picker */}
          <DatePicker
            modal
            open={isTimePickerVisible}
            date={taskTime}
            mode="time"
            onConfirm={time => {
              setTimePickerVisible(false);
              setTaskTime(time);
            }}
            onCancel={() => setTimePickerVisible(false)}
          />

          {/* Button Container */}
          <View style={styles.btnContainer1}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={toggleModal}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleUpdateTask}>
              <Text style={styles.modalButtonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default ViewTodoScreen;
