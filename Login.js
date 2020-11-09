import React from 'react';
import { Button, ImageBackground, StyleSheet, View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Login({ setSignInStatus }) {

  const renderLoginForm = () => {
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
              AsyncStorage.setItem('data', JSON.stringify([{"token": data.token, "id": data.id}]))
              setSignInStatus()
            }
          }) 
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
              />
              <TextInput
                name="password"
                placeholder="Enter Password"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
      </Formik>
    )
  }

  return (
    <ImageBackground
      style={styles.image}
      source={require("./blue-sky.jpg")}
    >
      <View style={styles.container}>
        {renderLoginForm()}
      </View>
    </ImageBackground>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginForm: {
    justifyContent: "center",
    backgroundColor: 'rgba(230, 243, 255, .75)',
    borderRadius: 10,
    height: 250,
    width: 250,
    alignItems: "center"
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(230, 243, 255, .75)',
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 10,
    minHeight: 60,
    minWidth: 200,
    color: "rgba( 61, 85, 35, 1)",
    fontSize: 20,
    backgroundColor: 'rgba(230, 243, 255, .85)',
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(230, 243, 255, .75)',
    borderStyle: "solid",
    borderRadius: 10,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",  
    backgroundColor: 'rgba(230, 243, 255, .85)',
    marginTop: 15,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "rgba( 61, 85, 35, 1)",
    fontSize: 16,
  }
  
});

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.setSignInStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSignInStatus: () => dispatch({
      type: "CHANGESIGNIN",
      payload: true
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
