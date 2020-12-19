import { AsyncStorage } from 'react-native';

const AUTH_TOKEN_KEY = 'authorization_token';

const getPersistedToken = async () => {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    return token || '';
  } catch (e) {
    console.error('Failed to retrieve auth token, ', e.message);
  }
  return '';
};

const persistToken = async (token) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch (e) {
    console.error('Error while persisting auth token, ', e.message);
  }
};

const purgePersistedToken = async () => {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  } catch (e) {
    console.error('Error while purging auth token, ', e.message);
  }
};

export { getPersistedToken, persistToken, purgePersistedToken };
