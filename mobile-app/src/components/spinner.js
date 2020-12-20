import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { THEMES } from '../common/themeUtils';

const Spinner = ({ selectedTheme }) => {
  return (
    <View>
      <ActivityIndicator
        size="large"
        color={selectedTheme === THEMES.dark ? '#FFFFFF' : '#000000'}
        style={style.spinner}
      />
    </View>
  );
};

const style = StyleSheet.create({
  spinner: {
    paddingTop: '50%',
    alignSelf: 'center',
  },
});

Spinner.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  selectedTheme: app.selectedTheme,
});

export default connect(mapStateToProps)(Spinner);
