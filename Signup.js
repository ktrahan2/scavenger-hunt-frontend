import React from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity } from 'react-native';
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
          console.log("values", values)
          fetch('http://localhost:7000/create-user', {
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
            AsyncStorage.setItem('data', JSON.stringify([{"token": data.token, "user": data.user}]))
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
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              placeholderTextColor= "rgba( 61, 85, 35, 1)"
              autoCapitalize="none"
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
              autoCapitalize="none"
            />
            <TextInput
              name="email"
              placeholder="Enter email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              placeholderTextColor= "rgba( 61, 85, 35, 1)"
              autoCapitalize="none"
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.text}>Signup</Text>
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
    height: 320,
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
