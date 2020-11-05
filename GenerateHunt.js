import React from 'react'
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { connect } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'
import {store} from './App'

function GenerateHunt({ 
    navigation,
    isThemeSelected, 
    setThemeSelected, 
    isItemAmount, 
    setItemAmount,
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
        <View style={styles.screenContainer}>
            <View>
                {/* <TextInput
                    name="list title"
                    label="Hunt List Title"
                    style={styles.input}
                    onChangeText={handleChange()}
                    autoCapitalize="none"
                    placeholder="Enter Hunt List Title"
                /> */}
                <DropDownPicker
                    style={styles.dropDown}
                    items={[
                        {label: "nature", value: "nature"},
                        {label: "christmas", value: "christmas"},
                    ]}
                    defaultValue={isThemeSelected}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Select a theme"
                    onChangeItem={item => setThemeSelected(item.value)}
                    zIndex={5000}
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
                    placeholder="Select item amount"
                    onChangeItem={item => setItemAmount(item.value)}
                    zIndex={4000}
                />
                <Button
                    title="Get Random Hunt"
                    onPress={handleCreateList}
                />
            </View>  
            {console.log(store.getState())}         
        </View>
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
      }) 
  
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(GenerateHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    dropDown: {
        justifyContent: "center",
        alignContent: "center",
        margin: 10,
    }
})