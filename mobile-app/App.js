import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/configureStore';
import MainComponent from './src/components/mainComponent';

const App = () => {
  return (
    <Provider store={store}>
      <MainComponent />
    </Provider>
  );
};

export default App;
