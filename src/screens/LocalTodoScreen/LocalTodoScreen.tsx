import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import TaskList from '../../components/TaskList/TaskList';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const dataList = [
  {
    id: '1',
    taskName: 'task 1',
    taskDetail: 'task detail 1',
    date: '05-08-2025',
    time: '09:25 pm',
  },
  {
    id: '2',
    taskName: 'task 2',
    taskDetail: 'task detail 2',
    date: '06-08-2025',
    time: '10:20 pm',
  },
];

const LocalTodoScreen = () => {
  const {colors} = useColors();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <LinearGradient
      colors={[colors.primary5, colors.primary2]}
      style={styles.screen}>
      {/*search container */}
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

      {/*Add Task button */}
      <TouchableOpacity style={styles.addTaskBtn} onPress={toggleModal}>
        <Text style={styles.btnTxtStyle}>Add Task</Text>
      </TouchableOpacity>
      {/*Tasks Lists */}
      <TaskList
        backgroundColor={'white'}
        description={
          'my desc dfgsdfsdfsdfd df dfsdfsdfsdf dfdfdferrttyrt ffsdfsdfsd sd '
        }
        title={'my title'}
        date={'15-01-2025'}
        time={'06:45'}
        readMore
        remove
      />

      {/*Modal */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal} // Close modal on backdrop press
        style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Task</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Task Title"
            placeholderTextColor={colors.placeholderColor}
          />
          <TextInput
            style={styles.modalInputDes}
            placeholder="Task Description"
            placeholderTextColor={colors.placeholderColor}
            multiline
            textAlignVertical="top"
          />

          {/*time and date fields */}
          <View style={styles.dtContainer}>
            <TouchableOpacity style={styles.dateContainer}>
              <Image source={require('../../assets/dateIcon.png')} />
              <Text style={styles.dateStyle}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dateContainer}>
              <Image source={require('../../assets/timeIcon.png')} />
              <Text style={styles.dateStyle}>Time</Text>
            </TouchableOpacity>
          </View>
          {/*button container */}
          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.cancelModalButton}
              onPress={toggleModal}>
              <Text style={styles.cancelModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
              <Text style={styles.modalButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

export default LocalTodoScreen;
