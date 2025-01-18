import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {addTask} from '../../store/taskSlice';
import TaskList from '../../components/TaskList/TaskList';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const LocalTodoScreen = () => {
  const {colors} = useColors();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.tasks); // Get tasks from Redux store

  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateTask = () => {
    if (taskTitle && taskDescription && taskDate && taskTime) {
      dispatch(
        addTask({
          taskName: taskTitle,
          taskDescription,
          date: taskDate.toLocaleDateString(),
          time: taskTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        }),
      );
      toggleModal();
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate(new Date());
      setTaskTime(new Date());
    } else {
      alert('Please fill in all fields');
    }
  };

  const renderTaskItem = ({item}) => (
    <TaskList
      id={item.id} // Pass unique task ID
      title={item.taskName}
      description={item.taskDescription}
      date={item.date}
      time={item.time}
      backgroundColor="white"
      readMore
      remove
    />
  );

  return (
    <LinearGradient
      colors={[colors.primary5, colors.primary2]}
      style={styles.screen}>
      {/* Search Container */}
      <View style={styles.mainSearchContainer}>
        <View style={styles.searchViewContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Search"
              placeholderTextColor={colors.placeholderColor}
            />
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

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addTaskBtn} onPress={toggleModal}>
        <Text style={styles.btnTxtStyle}>Add Task</Text>
      </TouchableOpacity>

      {/* Task List using FlatList */}
      <FlatList
        data={tasks} // Use tasks from Redux store
        renderItem={renderTaskItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        ItemSeparatorComponent={() => <View style={{height: hp(3)}} />}
      />

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Task</Text>
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
          />

          {/* Date and Time Fields */}
          <View style={styles.dtContainer}>
            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setDatePickerVisible(true)}>
              <Image source={require('../../assets/dateIcon.png')} />
              <Text style={styles.dateStyle}>
                {taskDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setTimePickerVisible(true)}>
              <Image source={require('../../assets/timeIcon.png')} />
              <Text style={styles.dateStyle}>
                {taskTime.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
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
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={toggleModal}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleCreateTask}>
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default LocalTodoScreen;
