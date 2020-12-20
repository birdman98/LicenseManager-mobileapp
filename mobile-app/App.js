import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';

import store from './src/redux/configureStore';
import RoutesProtector from './src/components/routesProtector';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Root>
          <RoutesProtector />
        </Root>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
