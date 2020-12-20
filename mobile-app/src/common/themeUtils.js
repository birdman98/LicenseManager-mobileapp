import { AsyncStorage } from 'react-native';

const THEMES = {
  light: 'light',
  dark: 'dark',
};

const PREFERED_THEME_KEY = 'preferred_theme';

const getSavedTheme = async () => {
  try {
    const theme = AsyncStorage.getItem(PREFERED_THEME_KEY);
    return theme || '';
  } catch (e) {
    console.error('Failed to retrieve theme preference, ', e.message);
  }
  return '';
};

const saveThemePreference = async (theme) => {
  try {
    await AsyncStorage.setItem(PREFERED_THEME_KEY, theme);
  } catch (e) {
    console.error('Failed to save theme preference, ', e.message);
  }
};

const getThemePreference = async () => {
  try {
    const theme = await getSavedTheme();
    return theme;
  } catch (e) {
    console.error('Failed to determine theme preference, ', e.message);
  }
  return '';
};

export { getThemePreference, saveThemePreference, THEMES };
