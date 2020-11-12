import React from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native"

export default function MyTextInput({ 
    input, 
    handleChange,
    values 
    }) {

    const createTextInput = () => {
        return input !== "password" ?
              <TextInput
                name={input}
                label={input}
                style={styles.input}
                placeholder={"Enter" + " " + input}
                onChangeText={handleChange(input)}
                value={values.input}
                autoCapitalize="none"
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
            />
        : 
            <TextInput
                name={input}
                label={input}
                style={styles.input}
                placeholder={"Enter" + " " + input}
                onChangeText={handleChange(input)}
                value={values.input}
                autoCapitalize="none"
                placeholderTextColor= "rgba( 61, 85, 35, 1)"
                secureTextEntry={true}
            />
        
    }

    return (
        createTextInput()
    )
}

const styles = StyleSheet.create({
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
    }
})