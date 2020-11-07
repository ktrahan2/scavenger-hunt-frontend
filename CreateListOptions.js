import React from 'react'
import DropDownPicker from 'react-native-dropdown-picker'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet, View, ImageBackground, Text } from 'react-native';


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
              <Text style={styles.h2}>Select a theme and number of items</Text>
              <View style={styles.borderLine}></View>
                <DropDownPicker
                    style={styles.dropDown}
                    items={[
                        {label: "nature", value: "nature"},
                        {label: "christmas", value: "christmas"},
                    ]}
                    defaultValue={isThemeSelected}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Select a theme"
                    labelStyle={{color: "rgba( 61, 85, 35, 1)", fontSize: 20,  }}
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
                    labelStyle={{color: "rgba( 61, 85, 35, 1)", fontSize: 20 }}
                    onChangeItem={item => setItemAmount(item.value)}
                    zIndex={4000}
                    dropDownStyle={{backgroundColor: 'rgba(230, 243, 255, 1)'}}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreateList}
                >
                  <Text style={styles.buttonText}>Get Random Hunt</Text>
                </TouchableOpacity>
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
        backgroundColor: 'rgba(230, 243, 255, .85)',
        borderColor: 'rgba(230, 243, 255, .75)',
      },
      image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
      form: {
        justifyContent: "center",
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        height: 350,
        width: 300,
        alignItems: "center" 
      },
      h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)",
      },
      borderLine: {
        width: "95%", 
        borderBottomWidth: 2, 
        borderBottomColor: "rgba(0, 0, 0, .3)",
        marginTop: -20,
        marginBottom: 15, 
        borderStyle: "solid"
      },
      button: {
        borderWidth: 1,
        borderColor: 'rgba(230, 243, 255, .75)',
        borderStyle: "solid",
        borderRadius: 10,
        width: "75%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: 'rgba(230, 243, 255, .85)',
        marginTop: 15,
      },
      buttonText: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 16,
      },


})
