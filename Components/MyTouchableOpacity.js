import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native';


export default function myTouchableOpacity({
    buttonText,
    handlePress
    }) {

    const createButton = () => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={handlePress}
            >
                <Text style={styles.text}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <>
            {createButton()}
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        borderColor: 'rgba(230, 243, 255, .75)',
        borderStyle: "solid",
        borderRadius: 10,
        height: 40,
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: 'rgba(200, 230, 240, 1)',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5
    },
    text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 16,
    }
})
