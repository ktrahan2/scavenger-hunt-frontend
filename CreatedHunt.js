import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'


function CreatedHunt({
    isThemeArray,
    isChecked,
    isItemClicked,
    clickItem,
    unClickItem,
    check,
    uncheck

    }) {

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
    
    const generateHuntList = () => {
        return isThemeArray.map(item => {
            return (
                <View style={styles.listItem} key={item.ID}>
                <CheckBox
                    checked={isChecked.includes(item.name) ? true : false}
                    onPress={(event) => handleCheck(event, item)}
                    containerStyle={styles.checkbox}
                />
                <Text 
                    style={styles.text}
                    onPress={() => handleClick(item)}
                    >
                    {item.name} <FontAwesomeIcon icon={ faChevronCircleDown } />
                </Text>
                <View>
                    { isItemClicked === item.name ?
                        <Image
                        style={styles.itemImage}
                        source={{uri: item.image}}
                        />
                    : null
                    } 
                </View> 
                </View>
            )
        })
    }

    return (
        <>
        {generateHuntList()}
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      isThemeArray: state.setThemeArray,
      isChecked: state.setChecked,
      isItemClicked: state.setItemClicked,
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
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
        })      
    }
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatedHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
})