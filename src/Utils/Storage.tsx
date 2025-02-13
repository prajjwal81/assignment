import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_KEY = 'timers';

export const getTimers = async () => {
  const data = await AsyncStorage.getItem(TIMERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveTimers = async timers => {
  await AsyncStorage.setItem(TIMERS_KEY, JSON.stringify(timers));
};
