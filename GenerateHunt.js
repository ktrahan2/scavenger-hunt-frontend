import React from 'react'
import { Button, StyleSheet, View, ImageBackground, TextInput } from 'react-native';
import { connect } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'
import { store } from './App'

function GenerateHunt({ 
    navigation,
    isThemeSelected, 
    setThemeSelected, 
    isItemAmount, 
    setItemAmount,
    allHuntItems,
    setThemeArray,
    setHuntTitle 
  }) {

    const handleCreateList = () => {
        createThemeArray()
        navigation.navigate('Generated Hunt')
    }

    const createThemeArray = () => {
        let themeArray = []
        allHuntItems.map(item => {
            item.theme === isThemeSelected ?
            themeArray.push(item)
            : null
        })
        themeArray = shuffleArray(themeArray).splice(0, isItemAmount)
        setThemeArray(themeArray)
    }
    
    const shuffleArray = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex

        while ( 0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1

            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    return (
      <ImageBackground
      style={styles.image}
      source={require("./blue-sky.jpg")}
      >
        <View style={styles.screenContainer}>
            <View style={styles.form}>
                <TextInput
                    name="list title"
                    label="Hunt List Title"
                    style={styles.input}
                    onChangeText={text => setHuntTitle(text)}
                    autoCapitalize="none"
                    placeholder="Enter Title"
                    placeholderTextColor= "black"
                />
                <DropDownPicker
                    style={styles.dropDown}
                    items={[
                        {label: "nature", value: "nature"},
                        {label: "christmas", value: "christmas"},
                    ]}
                    defaultValue={isThemeSelected}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Select a theme"
                    labelStyle={{color: "black", fontSize: 20,  }}
                    onChangeItem={item => setThemeSelected(item.value)}
                    zIndex={5000}
                    dropDownStyle={{backgroundColor: 'rgba(230, 243, 255, 1)'}}
                />
                <DropDownPicker
                    style={styles.dropDown}
                    items={[
                        {label: "5", value: "5"},
                        {label: "10", value: "10"},
                        {label: "15", value: "15"}
                    ]}
                    defaultValue={isItemAmount}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Item amount"
                    labelStyle={{color: "black", fontSize: 20 }}
                    onChangeItem={item => setItemAmount(item.value)}
                    zIndex={4000}
                    dropDownStyle={{backgroundColor: 'rgba(230, 243, 255, 1)'}}
                />
                <Button
                    title="Get Random Hunt"
                    onPress={handleCreateList}
                    color= "black"
                    accessibilityLabel="Click to generate a hunt list"
                />
            </View>  
            {console.log(store.getState())}         
        </View>
      </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
      allHuntItems: state.setHuntListItems,
      isItemAmount: state.setItemAmount,
      isThemeSelected: state.setThemeSelected,
      currentThemeArray: state.setThemeArray
    }
  }
  
function mapDispatchToProps(dispatch) {
  return {
    setHuntListItems: (result) => dispatch({
      type: "ALLHUNTITEMS",
      payload: result
    }),
    setThemeSelected: (theme) => dispatch({
        type: "UPDATETHEME",
        payload: theme
    }),
    setItemAmount: (number) => dispatch({
        type: "UPDATEITEMAMOUNT",
        payload: number
    }),
    setThemeArray: (array) => dispatch({
      type: "CREATEARRAY",
      payload: array
    }),
    setHuntTitle: (name) => dispatch({
      type: "SETNAME",
      payload: name
    }) 
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(GenerateHunt);

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropDown: {
      justifyContent: "center",
      alignContent: "center",
      margin: 10,
      backgroundColor: 'rgba(230, 243, 255, .1)',
      borderColor: 'rgba(230, 243, 255, .75)',
    },
    input: {
      borderWidth: 1,
      borderColor: 'rgba(230, 243, 255, .75)',
      padding: 8,
      margin: 10,
      width: "85%",
      borderRadius: 10,
      minHeight: 50,
      minWidth: "85%",
      color: "black",
      fontSize: 20
    },
    form: {
      justifyContent: "center",
      backgroundColor: 'rgba(230, 243, 255, .75)',
      borderRadius: 10,
      height: 300,
      width: 300,
      alignItems: "center" 
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
})