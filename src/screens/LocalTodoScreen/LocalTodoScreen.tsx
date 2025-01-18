import React, {useState, useMemo, useEffect} from 'react';
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
  const tasks = useSelector(state => state.tasks.tasks);
  const reversedTasks = useMemo(() => [...tasks].reverse(), [tasks]);

  // Get tasks from Redux store

  const [isModalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isSearchDatePickerVisible, setSearchDatePickerVisible] =
    useState(false);
  const [isSearchTimePickerVisible, setSearchTimePickerVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredTasks, setFilteredTasks] = useState(reversedTasks); // Filtered tasks state
  const [filterDate, setFilterDate] = useState(null); // Filter by date
  const [filterTime, setFilterTime] = useState(null); // Filter by time
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

  const handleFilter = () => {
    console.log('Filtering tasks...');
    let filtered = reversedTasks;

    // Check if date is selected and filter by date
    if (filterDate) {
      const formattedFilterDate = filterDate
        .toLocaleDateString('en-GB') // Convert to DD/MM/YYYY
        .replace(/-/g, '/'); // Ensure separators are correct
      filtered = filtered.filter(task => task.date === formattedFilterDate);
    }

    // Check if time is selected and filter by time
    if (filterTime) {
      const formattedFilterTime = filterTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
      });
      filtered = filtered.filter(task => task.time === formattedFilterTime);
    }

    setFilteredTasks(filtered);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(reversedTasks); // Show all tasks if search query is empty
    } else {
      const filtered = reversedTasks.filter(task =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    setFilteredTasks(reversedTasks);
  }, [reversedTasks]); // Use reversedTasks as dependency

  useEffect(() => {
    let filtered = reversedTasks;

    // Filter by date
    if (filterDate) {
      const formattedFilterDate = filterDate
        .toLocaleDateString('en-GB') // Convert to DD/MM/YYYY
        .replace(/-/g, '/'); // Ensure separators are correct
      filtered = filtered.filter(task => task.date === formattedFilterDate);
    }

    // Filter by time
    if (filterTime) {
      const formattedFilterTime = filterTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 24-hour format
      });
      filtered = filtered.filter(task => task.time === formattedFilterTime);
    }

    setFilteredTasks(filtered);
  }, [filterDate, filterTime, reversedTasks]); // Run whenever date, time, or tasks change

  const renderTaskItem = ({item}) => (
    <TaskList
      id={item.id} // Pass unique task ID
      title={item.taskName}
      description={item.taskDescription}
      date={item.date}
      time={formatTime(item.time)}
      backgroundColor="white"
      readMore
      remove
      item={item}
    />
  );

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
              value={searchQuery}
              onChangeText={text => {
                setSearchQuery(text); // Update searchQuery state
                if (text.trim() === '') {
                  setFilteredTasks(reversedTasks); // Reset to all tasks if search field is empty
                }
              }}
            />
          </View>
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
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
      <View style={styles.filterSearchContainer}>
        {/* Date Filter */}
        <TouchableOpacity
          style={styles.searchFilterContainer}
          onPress={() => setSearchDatePickerVisible(true)}>
          <Image
            source={require('../../assets/miniCalender.png')}
            tintColor={colors.placeholderColor}
          />
          <Text style={{color: colors.white, marginLeft: wp(1)}}>
            Filter by Date
          </Text>
        </TouchableOpacity>

        {/* Time Filter */}
        <TouchableOpacity
          style={styles.searchFilterContainer1}
          onPress={() => setSearchTimePickerVisible(true)}>
          <Image
            source={require('../../assets/miniClock.png')}
            tintColor={colors.iconColor}
          />
          <Text style={{color: colors.white}}>Filter by Time</Text>
        </TouchableOpacity>
      </View>

      {/* Add Task Button */}
      <TouchableOpacity style={styles.addTaskBtn} onPress={toggleModal}>
        <Text style={styles.btnTxtStyle}>Add Task</Text>
      </TouchableOpacity>

      {/* Task List using FlatList */}
      <FlatList
        data={filteredTasks} // Use filteredTasks instead of all tasks
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
            maxLength={50}
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

      {/* Date Picker */}
      <DatePicker
        modal
        open={isSearchDatePickerVisible}
        date={filterDate || new Date()}
        mode="date"
        onConfirm={date => {
          setSearchDatePickerVisible(false);
          setFilterDate(date);
          handleFilter();
        }}
        onCancel={() => setDatePickerVisible(false)}
      />

      {/* Time Picker */}
      <DatePicker
        modal
        open={isSearchTimePickerVisible}
        date={filterTime || new Date()}
        mode="time"
        onConfirm={time => {
          setSearchTimePickerVisible(false);
          setFilterTime(time);
          handleFilter();
        }}
        onCancel={() => setTimePickerVisible(false)}
      />
    </LinearGradient>
  );
};

export default LocalTodoScreen;
