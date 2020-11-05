import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'
import DropDownPicker from 'react-native-dropdown-picker'

function GenerateHunt({ 
        themeSelected, 
        updateThemeSelected, 
        itemAmount, 
        updateItemAmount,
        isHuntList, 
        createHuntList, 
        allHuntItems 
    }) {

    const generateHuntList = () => {
        console.log('hunt list created')
    }

    const handleCreateList = () => {
        createHuntList()
    }

    return (
        <View style={styles.screenContainer}>
            <View>
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
                />
                <DropDownPicker
                    style={styles.dropDown}
                    items={[
                        {label: "5", value: "5"},
                        {label: "10", value: "10"},
                        {label: "15", value: "15"}
                    ]}
                    defaultValue={itemAmount}
                    containerStyle={{height: 60, width: "90%"}}
                    placeholder="Select item amount"
                    onChangeItem={item => updateItemAmount(item.value)}
                />
                <Button
                    title="Get Random Hunt"
                    onPress={handleCreateList}
                />
            </View>
            {isHuntList ? 
                <View>
                    {generateHuntList()}
                </View>            
            : null}
        </View>
    )
}

//generate fetch when they select theme and amount of items to generate. 
const mapStateToProps = (state) => {
    return {
      allHuntItems: state.setHuntListItems,
      themeSelected: state.themeSelected,
      itemAmount: state.itemAmountSelected,
      isHuntList: state.createHuntList
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
      createHuntList: () => dispatch({
          type: "CREATELIST",
          payload: true
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
        margin: 10
    }
})