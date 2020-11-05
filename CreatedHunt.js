import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { CheckBox } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'


function CreatedHunt({
    currentThemeArray,
    isChecked,

    }) {
    
    const generateHuntList = () => {
        return currentThemeArray.map(item => {
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
      currentThemeArray: state.setThemeArray,
      isChecked: state.isChecked,
      isItemClicked: state.isItemClicked,

    }
}
  
function mapDispatchToProps(dispatch) {
    return {}
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatedHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    }
})