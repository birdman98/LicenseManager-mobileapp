import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Avatar, Button, Text } from 'react-native-elements';
import { Switch } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import { logoutUser } from '../redux/slices/authenticationSlice';
import { changeTheme } from '../redux/slices/appSlice';
import { THEMES } from '../common/themeUtils';

const SettingsView = ({ logoutUser, user, selectedTheme, changeTheme }) => {
  const { username, firstName, lastName } = user;

  return (
    <View style={style.view}>
      <Avatar
        rounded
        title={`${firstName[0]}${lastName[0]}`}
        size="large"
        titleStyle={
          selectedTheme === THEMES.dark
            ? style.avatarTitleDark
            : style.avatarTitleLight
        }
        containerStyle={
          selectedTheme === THEMES.dark
            ? style.avatarContainerDark
            : style.avatarContainerLight
        }
      />
      <Text h4 style={style.mainText}>
        Profile Details
      </Text>
      <Text style={style.textBold}>{`@${username}`}</Text>
      <Text style={style.text}>{firstName}</Text>
      <Text style={style.text}>{lastName}</Text>
      <Text style={style.themeText}>{`Dark Theme ${
        selectedTheme === THEMES.dark ? 'Enabled' : 'Disabled'
      }`}</Text>

      <Icon
        name={selectedTheme === THEMES.dark ? 'moon-o' : 'sun-o'}
        size={18}
        color={selectedTheme === THEMES.dark ? '#FFFFFF' : '#000000'}
        style={{ alignSelf: 'center' }}
      />
      <Switch
        style={style.switch}
        value={selectedTheme === THEMES.dark}
        onValueChange={() =>
          changeTheme(
            selectedTheme === THEMES.dark ? THEMES.light : THEMES.dark
          )
        }
      />
      <Button title="Logout" buttonStyle={style.button} onPress={logoutUser} />
    </View>
  );
};

const style = StyleSheet.create({
  view: {
    paddingLeft: '20%',
    paddingRight: '20%',
    paddingTop: '5%',
    paddingBottom: '5%',
  },
  avatarTitleLight: {
    color: '#FFFFFF',
  },
  avatarTitleDark: {
    color: '#000000',
  },
  avatarContainerLight: {
    backgroundColor: '#000000',
    alignSelf: 'center',
    marginTop: '20%',
  },
  avatarContainerDark: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginTop: '20%',
  },
  mainText: {
    alignSelf: 'center',
    marginTop: '3%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '5%',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    marginTop: '5%',
    alignSelf: 'center',
  },
  themeText: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: '30%',
  },
  switch: {
    alignSelf: 'center',
    marginTop: '5%',
  },
  button: {
    marginTop: '40%',
  },
});

SettingsView.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  selectedTheme: PropTypes.string.isRequired,
  changeTheme: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authentication, app }) => ({
  user: authentication.user,
  selectedTheme: app.selectedTheme,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
  changeTheme: (theme) => dispatch(changeTheme(theme)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsView);
