import React from 'react';
import { Button, StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Signup({ setSignInStatus }) {

  const renderSignupForm = () => {
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
            setSignInStatus()
          })
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.form}>
            <TextInput
              name="username"
              label="Username"
              style={styles.input}
              placeholder="Enter Username"
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholderTextColor= "black"
              autoCapitalize="none"
            />
            <TextInput
              name="password"
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry={true}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              placeholderTextColor= "black"
              autoCapitalize="none"
            />
            <TextInput
              name="email"
              placeholder="Enter email"
              style={styles.input}
              onChange={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor= "black"
              autoCapitalize="none"
            />
            <Button
              style={styles.button}
              title="Signup"
              onPress={handleSubmit}
              color= "black"
              accessibilityLabe="click to signup"
            />
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
        {renderSignupForm()}
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
  form: {
    justifyContent: "center",
    backgroundColor: 'rgba(230, 243, 255, .65)',
    borderRadius: 10,
    height: 300,
    width: 300,
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
    color: "black",
    fontSize: 20,
  },
  button: {
    borderWidth: 1,
    borderStyle: "solid",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
