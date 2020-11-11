import React from 'react'
import { Image, ImageBackground, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

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
                source={require("./blue-sky.jpg")}
            >
                <Image
                    style={styles.image}
                    source={
                        isLoadingImage == "Welcome Bear" ?
                        require("./bear.png")
                    : 
                        require("./enjoybear.png")
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

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

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
