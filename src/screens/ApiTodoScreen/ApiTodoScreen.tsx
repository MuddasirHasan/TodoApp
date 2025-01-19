import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import {useDispatch} from 'react-redux';
import ApiTaskList from '../../components/ApiTaskList/ApiTaskList';
import {getTodos} from '../../store/GetTodosSlice';
import LinearGradient from 'react-native-linear-gradient';
import {useColors} from '../../hooks';
import {useStyle} from './Styles';

const styles = useStyle();

const ApiTodoScreen = () => {
  const {colors} = useColors();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]); // Store all tasks
  const [loading, setLoading] = useState(false); // Loading for API call
  const [isFetchingMore, setIsFetchingMore] = useState(false); // For pagination spinner
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Determine if more data is available

  const ITEMS_PER_PAGE = 10; // Number of items to load per page

  const fetchTodos = async (pageNumber = 1) => {
    if (!hasMore) return; // Stop fetching if no more data is available

    try {
      setLoading(pageNumber === 1); // Show initial spinner for the first page
      setIsFetchingMore(pageNumber > 1); // Show pagination spinner for subsequent pages

      const response = await dispatch(getTodos());
      if (response?.payload) {
        const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = response.payload.slice(startIndex, endIndex);

        if (paginatedData.length < ITEMS_PER_PAGE) {
          setHasMore(false); // No more data to fetch
        }

        setTasks(prevTasks => [...prevTasks, ...paginatedData]); // Append new items
      } else {
        Alert.alert('Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      Alert.alert('Error', 'Failed to fetch todos. Please try again.');
    } finally {
      setLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchTodos(page);
  }, [page]);

  const loadMoreTodos = () => {
    if (!isFetchingMore && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const renderTodoItem = ({item}) => (
    <ApiTaskList
      backgroundColor={item?.completed ? colors.complete : colors.incomplete}
      title={`User : ${item?.id}`}
      description={`Task: ${item?.title}`}
      id={item.id}
      readMore={false}
      remove={false}
      item={item}
    />
  );

  const renderFooter = () => {
    if (!isFetchingMore) return null;

    return (
      <View style={{padding: hp(2), alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primary2} />
      </View>
    );
  };

  return (
    <LinearGradient
      colors={[colors.primary1, colors.primary2]}
      style={styles.screen}>
      {/* Title Container */}
      <View style={styles.titleContainer}>
        <Image
          source={require('../../assets/view-list.png')}
          style={styles.logoStyle}
          tintColor={colors.white}
        />
        <Text style={styles.titleStyle}>Fetch Todos</Text>
      </View>

      {/* Spinner */}
      {/* Spinner */}
      {loading && (
        <Spinner
          visible={loading}
          textContent="Loading Todos..."
          textStyle={{color: colors.white}}
        />
      )}

      {/* FlatList to display todos */}
      {!loading && (
        <View style={{marginTop: hp(3), marginBottom: hp(10)}}>
          <FlatList
            data={tasks}
            renderItem={renderTodoItem}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.flatListContainer}
            ItemSeparatorComponent={() => <View style={{height: hp(2)}} />}
            onEndReached={loadMoreTodos} // Trigger when reaching the end
            onEndReachedThreshold={0.5} // Trigger when 50% of the list is visible
            ListFooterComponent={renderFooter} // Show spinner for pagination
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default ApiTodoScreen;
