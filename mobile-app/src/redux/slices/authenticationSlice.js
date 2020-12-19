import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { setAxiosAuthToken } from '../../common/axios';

const initialState = {
  isAuthenticated: false,
  isAuthenticationInProgress: false,
  authenticationErrorMsg: '',
  authorizationToken: '',
  rehydrationInProgress: true,
  isLogoutInProgress: false,
  logoutMessage: '',
  user: {
    username: '',
    firstName: '',
    lastName: '',
    roles: [],
    privileges: [],
  },
};

const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async (credentials, { rejectWithValue }) => {
    return axios
      .post('/api/auth/login', credentials)
      .then((response) => response.data)
      .catch((error) =>
        rejectWithValue(error.response ? error.response.data : error.message)
      );
  }
);

const logoutUser = createAsyncThunk('user/logout', (_, { rejectWithValue }) => {
  return axios
    .post('/api/auth/logout')
    .then(({ data }) => data)
    .catch((error) =>
      rejectWithValue(error.response ? error.response.data : error.message)
    );
});

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  extraReducers: {
    [authenticateUser.pending]: (state) => {
      return {
        ...state,
        isAuthenticationInProgress: true,
      };
    },
    [authenticateUser.fulfilled]: (state, { payload }) => {
      const { authorizationToken } = payload;
      setAxiosAuthToken(authorizationToken);
      return {
        ...state,
        isAuthenticationInProgress: false,
        isAuthenticated: true,
        ...payload,
      };
    },
    [authenticateUser.rejected]: (state, { payload }) => {
      return {
        ...state,
        isAuthenticationInProgress: false,
        authenticationMessage: payload.message || payload,
      };
    },
    [logoutUser.pending]: (state) => {
      return {
        ...state,
        isLogoutInProgress: true,
      };
    },
    [logoutUser.fulfilled]: (state, { payload: { message } }) => {
      return {
        ...state,
        isLogoutInProgress: false,
        logoutMessage: message,
        isAuthenticated: false,
        authorizationToken: '',
        user: {
          username: '',
          firstName: '',
          lastName: '',
          roles: [],
          privileges: [],
        },
      };
    },
    [logoutUser.rejected]: (state) => {
      return {
        ...state,
        isLogoutInProgress: false,
        logoutMessage: '',
        isAuthenticated: false,
        authorizationToken: '',
        user: {
          username: '',
          firstName: '',
          lastName: '',
          roles: [],
          priveleges: [],
        },
      };
    },
  },
});

const { reducer: authenticationReducer } = authenticationSlice;

export { authenticationReducer, authenticateUser, logoutUser };
