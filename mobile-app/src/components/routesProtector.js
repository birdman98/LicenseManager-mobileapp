import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Spinner from '../components/spinner';
import LoginView from '../views/loginView';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const RoutesProtector = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Tab.Navigator>
      <Tab.Screen name="Licenses" component={Spinner} />
      <Tab.Screen name="Customers" component={Spinner} />
      <Tab.Screen name="Settings" component={Spinner} />
    </Tab.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen name="Log in" component={LoginView} />
    </Stack.Navigator>
  );
};

RoutesProtector.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
});

export default connect(mapStateToProps)(RoutesProtector);
