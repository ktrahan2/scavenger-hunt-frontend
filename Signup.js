import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login({isSignedIn}) {

  return (
  <Formik
    initialValues={{ username: '', password: '', email: ''}}
    onSubmit={values => {
      console.log(values)
      fetch('https://on-the-hunt.herokuapp.com/create-user', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          email: values.email
        })
      }).then(response => response.json())
      .then(data => {
        AsyncStorage.setItem("token", data.token)
        isSignedIn()
      })
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values }) => (
      <>
        <View style={styles.container}>
          <View style={styles.form}>
            <TextInput
              name="username"
              label="Username"
              style={styles.input}
              placeholder="Enter Username"
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholderTextColor= "white"

            />
            <TextInput
              name="password"
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry={true}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholderTextColor= "white"

            />
            <TextInput
              name="email"
              placeholder="Enter email"
              style={styles.input}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor= "white"

            />
            <Button
              style={styles.button}
              title="Signup"
              onPress={handleSubmit}
              color= "white"

            />
          </View>
        </View>
      </>
      )}
  </Formik>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 140, 0, .75)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",

  },
  form: {
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
