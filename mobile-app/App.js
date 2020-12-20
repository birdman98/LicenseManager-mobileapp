import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import store from './src/redux/configureStore';
import RoutesProtector from './src/components/routesProtector';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RoutesProtector />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
