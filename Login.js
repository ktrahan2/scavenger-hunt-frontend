import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyTouchableOpacity from './Components/MyTouchableOpacity'
import { postFetch } from "./FetchList"

function Login({ 
    setSignInStatus, 
    setNavigationLocation,
    setNavigationTimer,
    navigation,
    setLoadingImage 
  }) {

  const renderLoginForm = () => {
    return (
      <Formik
        initialValues={{ username: '', password: ''}}
        onSubmit={values => {
          let body = { 
            username: values.username,
            password: values.password
          }
          postFetch( "login", body )
          .then(data => {
            if (data === "Unathorized User Information") {
              window.alert('Unathorized User Information. Please try again.')
            } else {
              AsyncStorage.setItem('data', JSON.stringify([{"token": data.token, "user": data.user}]))
              setNavigationLocation("My Hunts")
              setNavigationTimer(2000)
              setLoadingImage("Welcome Bear")
              navigation.navigate("Splash Screen") 
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
              <MyTouchableOpacity 
                buttonText={"Login"}
                handlePress={handleSubmit}
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
    }),
    setNavigationLocation: (location) => dispatch({
      type: "SETLOCATION",
      payload: location
    }),
    setNavigationTimer: (time) => dispatch({
      type: "SETTIMER",
      payload: time
    }),
    setLoadingImage: (image) => dispatch({
      type: "SETLOADINGIMAGE",
      payload: image
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
