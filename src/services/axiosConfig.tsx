import axios from 'axios';
import {ProductionURl} from '../../env';
import {
  CommonActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const navigationRef = createNavigationContainerRef();

const UseAccessToken = async () => {
  const user = await AsyncStorage.getItem('user');
  if (user) {
    const parseUser = JSON.parse(user);
    return parseUser.token;
  }
  return null;
};

function navigate() {
  AsyncStorage.clear();
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: 'AppStackNavigator',
            params: {
              screen: 'SigninScreen',
            },
          },
        ],
      }),
    );
  }
}

const dataServer = axios.create({
  baseURL: ProductionURl,
  timeout: 200000,
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  headers: {
    'Content-Type': 'application/json',
  },
});

dataServer.interceptors.request.use(async config => {
  const state = await NetInfo.fetch();
  if (!state.isConnected) {
    return Promise.reject({message: 'No internet connection'});
  }
  return config;
});

dataServer.interceptors.response.use(
  response => response.data,
  error => {
    if (error?.response?.status === 401) {
      // navigate(); // Handle session expiry
    }
    return Promise.reject(error);
  },
);

export {dataServer};
