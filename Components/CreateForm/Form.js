import React from 'react'
import { Formik } from 'formik'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MyTouchableOpacity from '../MyTouchableOpacity'
import { postFetch } from '../../utility/FetchList'
import { connect } from 'react-redux'
import { StyleSheet, View } from "react-native"
import MyTextInput from "./TextInput"

function MyForm({
        setSignInStatus, 
        setNavigationLocation,
        setNavigationTimer,
        navigation,
        setLoadingImage,
        inputsArray,
        formButton,
        url 
    }) {

    const createTextInputs = ( array, handleChange, values ) => {
        return array.map(input => {
            return (
                <MyTextInput
                    input={input}
                    handleChange={handleChange}
                    values={values}
                />
            )
        })

    }

    return (
        <Formik
        initialValues={{ username: '', password: ''}}
        onSubmit={values => {
            let body = { 
                username: values.username,
                password: values.password
            }
            postFetch( url, body )
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
        {({ handleChange, handleSubmit, values }) => (
            <View style={styles.loginForm}>
                {createTextInputs(inputsArray, handleChange, values)}
                <MyTouchableOpacity 
                    buttonText={formButton}
                    handlePress={handleSubmit}
                />
            </View>
            )}
        </Formik>
    )
}


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
  
  export default connect(mapStateToProps, mapDispatchToProps)(MyForm);

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
      height: 350,
      width: 350,
      alignItems: "center"
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