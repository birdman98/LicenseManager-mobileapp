import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getThemePreference,
  saveThemePreference,
  THEMES,
} from '../../common/themeUtils';

const initialState = {
  isSelectingThemePending: false,
  selectedTheme: THEMES.light,
};

const setInitialTheme = createAsyncThunk(
  'app/theme_preferrence',
  (systemTheme, { rejectWithValue }) => {
    return getThemePreference()
      .then((selectedTheme) => selectedTheme || systemTheme)
      .catch(() => rejectWithValue(systemTheme));
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeTheme: (state, { payload }) => {
      saveThemePreference(payload);
      return {
        ...state,
        selectedTheme: payload,
      };
    },
  },
  extraReducers: {
    [setInitialTheme.pending]: (state) => {
      return {
        ...state,
        isSelectingThemePending: true,
      };
    },
    [setInitialTheme.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isSelectingThemePending: false,
        selectedTheme: payload,
      };
    },
    [setInitialTheme.rejected]: (state, { payload }) => {
      return {
        ...state,
        isSelectingThemePending: false,
        selectedTheme: payload,
      };
    },
  },
});

const { reducer: appReducer } = appSlice;
const { changeTheme } = appSlice.actions;

export { appReducer, setInitialTheme, changeTheme };
