import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import Spinner from '../components/spinner';
import LoginView from '../views/loginView';
import LicensesListView from '../views/licensesListView';
import CustomersListView from '../views/customersListView';
import SettingsView from '../views/settingsView';
import {
  abortRehydration,
  rehydrateAuthentication,
} from '../redux/slices/authenticationSlice';
import { getPersistedToken } from '../common/authTokenUtils';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RoutesProtector = ({
  rehydrationInProgress,
  isSelectingThemePending,
  rehydrateAuthentication,
  abortRehydration,
  isAuthenticated,
}) => {
  useEffect(() => {
    restoreAuthentication();
  }, []);

  const restoreAuthentication = async () => {
    const token = await getPersistedToken();
    token !== '' ? rehydrateAuthentication(token) : abortRehydration();
  };

  if (!rehydrationInProgress && !isSelectingThemePending) {
    return isAuthenticated ? (
      <Tab.Navigator>
        <Tab.Screen
          name="Licenses"
          component={LicensesListView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="key" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Customers"
          component={CustomersListView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="users" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsView}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="gears" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    ) : (
      <Stack.Navigator>
        <Stack.Screen name="Log in" component={LoginView} />
      </Stack.Navigator>
    );
  } else {
    return <Spinner />;
  }
};

RoutesProtector.propTypes = {
  rehydrationInProgress: PropTypes.bool.isRequired,
  isSelectingThemePending: PropTypes.bool.isRequired,
  rehydrateAuthentication: PropTypes.func.isRequired,
  abortRehydration: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authentication, app }) => ({
  rehydrationInProgress: authentication.rehydrationInProgress,
  isSelectingThemePending: app.isSelectingThemePending,
  isAuthenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  rehydrateAuthentication: (token) => dispatch(rehydrateAuthentication(token)),
  abortRehydration: () => dispatch(abortRehydration()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RoutesProtector);
