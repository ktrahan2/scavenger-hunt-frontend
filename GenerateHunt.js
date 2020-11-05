import React from 'react'
import { Button, StyleSheet, Text, View, Image, TextInput } from 'react-native';
import { connect } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'

function GenerateHunt({ 
        themeSelected, 
        updateThemeSelected, 
        isItemAmount, 
        updateItemAmount,
        navigation,
        isHuntList, 
        renderHuntList, 
        deleteHuntList,
        allHuntItems,
        isChecked,
        isItemClicked,
        clickItem,
        unClickItem,
        check,
        uncheck,
        setThemeArray 
    }) {

    const handleCreateList = () => {
        createThemeArray()
        navigation.navigate('Generated Hunt')
        //navigate to other screen
    }

    const createThemeArray = () => {
        let themeArray = []
        allHuntItems.map(item => {
            item.theme === themeSelected ?
            themeArray.push(item)
            : null
        })
        themeArray = shuffleArray(themeArray).splice(0, itemAmount)
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

    const handleChange = () => {

    }

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
          clickItem(item.name)
        } else {
          unClickItem(item.name)
        }
      }
    
    const handleCheck = ( event, item ) => {
        event.preventDefault()
        if (isChecked.includes(item.name)) {
            uncheck(item.name)
        } else {
            check(item.name)
        }
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
                    defaultValue={themeSelected}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Select a theme"
                    onChangeItem={item => updateThemeSelected(item.value)}
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
                    onChangeItem={item => updateItemAmount(item.value)}
                    zIndex={4000}
                />
                <Button
                    title="Get Random Hunt"
                    onPress={handleCreateList}
                />
            </View>           
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
      allHuntItems: state.setHuntListItems,
      isThemeSelected: state.setThemeSelected,
      isItemAmount: state.setisItemAmount,
      isHuntList: state.renderHuntList,
      currentThemeArray: state.themeArray
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      setHuntListItems: (result) => dispatch({
        type: "ALLHUNTITEMS",
        payload: result
      }),
      updateThemeSelected: (theme) => dispatch({
          type: "UPDATETHEME",
          payload: theme
      }),
      updateItemAmount: (number) => dispatch({
          type: "UPDATEITEMAMOUNT",
          payload: number
      }),
      renderHuntList: () => dispatch({
          type: "CREATELIST",
          payload: true
      }),
      deleteHuntList: () => dispatch({
          type: "DELETELIST",
          payload: false
      }),
      clickItem: (item) => dispatch({
        type: "CLICKED",
        payload: item  
      }),
      unClickItem: () => dispatch({
        type: "UNCLICKED",
        payload: ""
      }),
      check: (item) => dispatch({
        type: "CHECK",
        payload: item
      }),
      uncheck: (item) => dispatch({
        type: "UNCHECK",
        payload: item
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