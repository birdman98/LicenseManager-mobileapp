import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { setAxiosAuthToken } from '../../common/axios';
import { persistToken, purgePersistedToken } from '../../common/authTokenUtils';

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

const rehydrateAuthentication = createAsyncThunk(
  'user/restore',
  (token, { rejectWithValue }) => {
    return axios
      .get('/api/auth/token', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => ({ data, token }))
      .catch(() => rejectWithValue(''));
  }
);

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
  reducers: {
    abortRehydration: (state) => {
      return {
        ...state,
        rehydrationInProgress: false,
      };
    },
  },
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
      persistToken(authorizationToken);
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
    [rehydrateAuthentication.pending]: (state) => {
      return {
        ...state,
        rehydrationInProgress: true,
      };
    },
    [rehydrateAuthentication.fulfilled]: (
      state,
      { payload: { data, token } }
    ) => {
      setAxiosAuthToken(token);
      return {
        ...state,
        isAuthenticated: true,
        authorizationToken: token,
        rehydrationInProgress: false,
        user: {
          ...data,
        },
      };
    },
    [rehydrateAuthentication.rejected]: (state) => {
      return {
        ...state,
        isAuthenticated: false,
        authorizationToken: '',
        rehydrationInProgress: false,
      };
    },
    [logoutUser.pending]: (state) => {
      return {
        ...state,
        isLogoutInProgress: true,
      };
    },
    [logoutUser.fulfilled]: (state, { payload: { message } }) => {
      purgePersistedToken();
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
      purgePersistedToken();
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
const { abortRehydration } = authenticationSlice.actions;

export {
  authenticationReducer,
  authenticateUser,
  rehydrateAuthentication,
  logoutUser,
  abortRehydration,
};
