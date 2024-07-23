import AsyncStorage from "@react-native-async-storage/async-storage";

const IS_FIRST_LAUNCH_KEY = 'isFirstLaunch';

export const isFirstLaunch = async () => {
  try {
    const firstLaunch = await AsyncStorage.getItem(IS_FIRST_LAUNCH_KEY);
    return firstLaunch === null;
  } catch (error) {
    console.error('Error getting  first launch:', error);
  }
}

export const setFirstLaunch = async () => {
  try {
    await AsyncStorage.setItem(IS_FIRST_LAUNCH_KEY, 'false');
  } catch (error) {
    console.error('Error setting first launch:', error);
  }
}