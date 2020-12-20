import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { Root } from 'native-base';
import { ThemeProvider } from 'react-native-elements';
import { useColorScheme } from 'react-native-appearance';

import { setInitialTheme } from '../redux/slices/appSlice';
import { THEMES } from '../common/themeUtils';
import RoutesProtector from './routesProtector';

const MainComponent = ({ selectedTheme, setInitialTheme }) => {
  const systemTheme = useColorScheme();

  useEffect(() => {
    setInitialTheme(systemTheme);
  });

  return (
    <ThemeProvider useDark={selectedTheme === THEMES.dark}>
      <NavigationContainer
        theme={selectedTheme === THEMES.dark ? DarkTheme : DefaultTheme}
      >
        <Root>
          <RoutesProtector />
        </Root>
      </NavigationContainer>
    </ThemeProvider>
  );
};

MainComponent.propTypes = {
  selectedTheme: PropTypes.string.isRequired,
  setInitialTheme: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  selectedTheme: app.selectedTheme,
});

const mapDispatchToProps = (dispatch) => ({
  setInitialTheme: (systemTheme) => dispatch(setInitialTheme(systemTheme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
