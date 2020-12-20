import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <View>
      <ActivityIndicator
        size="large"
        style={{ paddingTop: '50%', alignSelf: 'center' }}
        color="#000000"
      />
    </View>
  );
};

export default Spinner;
