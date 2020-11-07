import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { connect } from 'react-redux'
import { Button, StyleSheet, View, ImageBackground, TextInput } from 'react-native';


function CreateList({
    setThemeSelected, 
    setItemAmount,
    navigation,
    isThemeSelected, 
    isItemAmount, 
    allHuntItems,
    setThemeArray
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
    </View>
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
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreateList);
