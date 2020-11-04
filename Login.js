import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { Formik } from 'formik'

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
            window.alert("Unathorized User Information. Please try again")
          } else {
            localStorage.setItem("userID", data.id)
            localStorage.setItem("token", data.token)
            isSignedIn()
          }
        })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <>
          <View style={styles.container}>
            <TextInput
              name="username"
              label="Username"
              style={styles.input}
              placeholder="Enter Username"
              onChange={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            <TextInput
              name="password"
              placeholder="Enter Password"
              style={styles.input}
              secureTextEntry={true}
              onChange={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button
              style={styles.button}
              title="Login"
              onPress={handleSubmit}
            />
          </View>
        </>
        )}
    </Formik>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 10,
    minHeight: 50,
    minWidth: 200
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
