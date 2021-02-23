import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import MyForm from '../CreateForm/Form'
import blueSky from '../../assets/blue-sky.jpg'

export default function Login({ navigation }) {

  const inputsArray = ["username", "password"]
  const formButton = "Login"

  return (
    <ImageBackground
      style={styles.image}
      source={blueSky}
    >
      <View style={styles.container}>
        <MyForm 
          url={"login"}
          navigation={navigation}
          inputsArray={inputsArray}
          formButton={formButton}
        />
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});


