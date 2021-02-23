import React from 'react'
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import blueSky from './assets/blue-sky.jpg'
import bear from './assets/bear.png'
import enjoyBear from './assets/enjoybear.png'
function SplashScreen({
    isNavigationLocation,
    isNavigationTimer,
    isLoadingImage,
    navigation,
    }) {

    const sendTo = (  ) => {

        { setTimeout( () => { 
            navigation.navigate("On The Hunt") }, 
            isNavigationTimer - 1
        )}
        { setTimeout( () => { 
            navigation.navigate(isNavigationLocation) }, 
            isNavigationTimer
        )}
        
    } 

    return (
            <ImageBackground
                style={styles.backgroundImage}
                source={blueSky}
            >
                <Image
                    style={styles.image}
                    source={
                        isLoadingImage == "Welcome Bear" ?
                        bear
                    : 
                        enjoyBear
                    }
                >
                </Image>
                {sendTo()}
            </ImageBackground> 
    )
}

const mapStateToProps = (state) => {
    return {
      isNavigationLocation: state.setNavigationLocation,
      isNavigationTimer: state.setNavigationTimer,
      isLoadingImage: state.setLoadingImage
    }
}

export default connect( mapStateToProps )(SplashScreen);

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
        alignContent: "center"
    },
    image: {
        alignSelf: "center",
        height: 400,
        width: 400
    }
})
