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
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const ITEMS_PER_PAGE = 10;

  const fetchTodos = async (pageNumber = 1) => {
    if (!hasMore) return;

    try {
      setLoading(pageNumber === 1);
      setIsFetchingMore(pageNumber > 1);

      const response = await dispatch(getTodos());
      if (response?.payload) {
        const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedData = response.payload.slice(startIndex, endIndex);

        if (paginatedData.length < ITEMS_PER_PAGE) {
          setHasMore(false);
        }

        setTasks(prevTasks => [...prevTasks, ...paginatedData]);
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
            onEndReached={loadMoreTodos}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        </View>
      )}
    </LinearGradient>
  );
};

export default ApiTodoScreen;
