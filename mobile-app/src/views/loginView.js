import React, { useState } from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Text, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { authenticateUser } from '../redux/slices/authenticationSlice';
import logo from '../icon.png';

const LoginPage = ({
  authenticateUser,
  authenticationErrorMsg,
  isAuthenticationInProgress,
}) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [usernameErrorMsg, setUsernameErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const formHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const validateForm = () => {
    const { username, password } = credentials;
    username === ''
      ? setUsernameErrorMsg('Username cannot be blank')
      : setUsernameErrorMsg('');
    password === ''
      ? setPasswordErrorMsg('Password cannot be blank')
      : setPasswordErrorMsg('');

    return username !== '' && password !== '';
  };

  const submitLoginRequest = () => {
    if (validateForm()) {
      authenticateUser(credentials);
    }
  };

  return (
    <ScrollView>
      <Image source={logo} style={style.logo} />
      {authenticationErrorMsg !== '' && (
        <Text style={style.errorText}>{authenticationErrorMsg}</Text>
      )}
      <Input
        placeholder="Username"
        leftIcon={<Icon name="user" size={24} color="black" />}
        onChangeText={(text) => formHandler('username', text)}
        autoCompleteType="username"
        textContentType="username"
        label="Username"
        errorMessage={usernameErrorMsg}
      />
      <Input
        placeholder="Password"
        leftIcon={<Icon name="lock" size={24} color="black" />}
        onChangeText={(text) => formHandler('password', text)}
        autoCompleteType="password"
        textContentType="password"
        secureTextEntry
        label="Password"
        errorMessage={passwordErrorMsg}
      />
      <Button
        title="Login"
        buttonStyle={style.button}
        onPress={submitLoginRequest}
        loading={isAuthenticationInProgress}
      />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    marginTop: '10%',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: '5%',
  },
  button: {
    margin: '20%',
  },
});

LoginPage.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  authenticationErrorMsg: PropTypes.string.isRequired,
  isAuthenticationInProgress: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authentication }) => ({
  authenticationErrorMsg: authentication.authenticationErrorMsg,
  isAuthenticationInProgress: authentication.isAuthenticationInProgress,
});

const mapDispatchToProps = (dispatch) => ({
  authenticateUser: (credentials) => dispatch(authenticateUser(credentials)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
