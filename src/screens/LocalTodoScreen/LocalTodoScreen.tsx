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
import ModalDropdown from 'react-native-modal-dropdown';
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
  const [sortOption, setSortOption] = useState(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isSearchDatePickerVisible, setSearchDatePickerVisible] =
    useState(false);
  const [isSearchTimePickerVisible, setSearchTimePickerVisible] =
    useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(reversedTasks);
  const [filterDate, setFilterDate] = useState(null);
  const [filterTime, setFilterTime] = useState(null);
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

    if (filterDate) {
      const formattedFilterDate = filterDate
        .toLocaleDateString('en-GB')
        .replace(/-/g, '/');
      filtered = filtered.filter(task => task.date === formattedFilterDate);
    }

    if (filterTime) {
      const formattedFilterTime = filterTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      filtered = filtered.filter(task => task.time === formattedFilterTime);
    }

    setFilteredTasks(filtered);
  };

  const handleSort = option => {
    let sortedTasks = [...filteredTasks];

    if (option === 'name') {
      // Sort by name (alphabetically)
      sortedTasks.sort((a, b) => a.taskName.localeCompare(b.taskName));
    } else if (option === 'dateAsc') {
      // Sort by date (ascending)
      sortedTasks.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateA - dateB;
      });
    } else if (option === 'dateDesc') {
      // Sort by date (descending)
      sortedTasks.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'));
        const dateB = new Date(b.date.split('/').reverse().join('-'));
        return dateB - dateA;
      });
    } else if (option === 'timeAsc') {
      // Sort by time (ascending)
      sortedTasks.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return timeA - timeB;
      });
    } else if (option === 'timeDesc') {
      // Sort by time (descending)
      sortedTasks.sort((a, b) => {
        const timeA = new Date(`1970-01-01T${a.time}`);
        const timeB = new Date(`1970-01-01T${b.time}`);
        return timeB - timeA;
      });
    }

    setFilteredTasks(sortedTasks);
    setSortOption(option);
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredTasks(reversedTasks);
    } else {
      const filtered = reversedTasks.filter(task =>
        task.taskName.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredTasks(filtered);
    }
  };

  useEffect(() => {
    setFilteredTasks(reversedTasks);
  }, [reversedTasks]);

  useEffect(() => {
    let filtered = reversedTasks;

    // Filter by date
    if (filterDate) {
      const formattedFilterDate = filterDate
        .toLocaleDateString('en-GB')
        .replace(/-/g, '/');
      filtered = filtered.filter(task => task.date === formattedFilterDate);
    }

    // Filter by time
    if (filterTime) {
      const formattedFilterTime = filterTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      filtered = filtered.filter(task => task.time === formattedFilterTime);
    }

    setFilteredTasks(filtered);
  }, [filterDate, filterTime, reversedTasks]);

  const renderTaskItem = ({item}) => (
    <TaskList
      id={item.id}
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
                setSearchQuery(text);
                if (text.trim() === '') {
                  setFilteredTasks(reversedTasks);
                }
              }}
            />
          </View>
          <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
            <Image source={require('../../assets/search.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.filterContainer}>
          <ModalDropdown
            options={[
              'Sort by Name',
              'Sort by Date (Ascending)',
              'Sort by Date (Descending)',
              'Sort by Time (Ascending)',
              'Sort by Time (Descending)',
            ]}
            onSelect={(index, value) => {
              // Debug log to check index and value
              console.log('Selected Index:', index);
              console.log('Selected Value:', value);

              // Call handleSort based on the selected option
              if (value === 'Sort by Name') handleSort('name');
              if (value === 'Sort by Date (Ascending)') handleSort('dateAsc');
              if (value === 'Sort by Date (Descending)') handleSort('dateDesc');
              if (value === 'Sort by Time (Ascending)') handleSort('timeAsc');
              if (value === 'Sort by Time (Descending)') handleSort('timeDesc');
            }}
            defaultValue="Sort Tasks"
            dropdownStyle={styles.dropdownStyle}
            textStyle={styles.dropdownTextStyle}
            showsVerticalScrollIndicator={true}>
            <View style={styles.filterButton}>
              <Image
                source={require('../../assets/filter.png')}
                tintColor={colors.iconColor}
              />
            </View>
          </ModalDropdown>
        </View>
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
      {filteredTasks.length > 0 ? (
        <FlatList
          data={filteredTasks}
          renderItem={renderTaskItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <View style={{height: hp(3)}} />}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: hp(1)}}
        />
      ) : (
        <Image
          source={require('../../assets/box.png')}
          style={styles.emptyStyle}
        />
      )}

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
