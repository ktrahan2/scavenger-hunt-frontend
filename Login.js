import React from 'react';
import { Button, ImageBackground, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login({ isSignedIn }) {

  return (
    <Formik
      initialValues={{ username: '', password: ''}}
      onSubmit={values => {
        fetch('https://on-the-hunt.herokuapp.com/login', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        }).then(response => response.json())
        .then(data => {
          if (data === "Unathorized User Information") {
            window.alert('Unathorized User Information. Please try again.')
          } else {
            AsyncStorage.setItem('token', data.token)
            isSignedIn()
          }
        })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View style={styles.container}>
          
          <View style={styles.loginForm}>
            <TextInput
              name="username"
              label="Username"
              style={styles.input}
              placeholder="Enter Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
              placeholderTextColor= "white"
            />
            <TextInput
              name="password"
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholderTextColor= "white"

            />
            <Button
              style={styles.button}
              title="Login"
              onPress={handleSubmit}
              color= "white"
            />
          </View>
        </View>
        )}
    </Formik>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 140, 0)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(165, 42, 42, 0.75)',
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 200,
    color: "orange"
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  
});

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.changeSignInStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isSignedIn: () => dispatch({
      type: "CHANGESIGNIN",
      payload: true
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
