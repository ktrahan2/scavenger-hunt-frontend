import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'

function CreatedHunt({
    isThemeArray,
    isItemClicked,
    clickItem,
    unClickItem,
    navigation,
    isHuntTitle
    }) {

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
            clickItem(item.name)
        } else {
            unClickItem(item.name)
        }
    }
    
    const generateHuntList = () => {
        return isThemeArray.map(item => {
            return (
                <View style={styles.listItem} key={item.ID}>
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

    const handleSaveList = () => {
        //fetch to local host huntlists
        console.log('one day ill save')
        navigation.navigate('My Hunts')
    }

    return (
        <ImageBackground
            style={styles.image}
            source={require("./blue-sky.jpg")}
        >
        <View style={styles.screenContainer}>
            <ScrollView 
                style={styles.list}
                alignItems= 'center'
                justifyContent= 'flex-start'
            >
                <Text style={styles.h2}>{isHuntTitle}</Text>
                {generateHuntList()}
                <View style={styles.buttonContainer}>
                    <Button
                        title="Save List"
                        onPress={handleSaveList}
                        color= "black"
                    />
                    <Button
                        title="Get a new list"
                        onPress={() => navigation.navigate('On The Hunt')}
                        color= "black"
                    />
                </View>
            </ScrollView>
        </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
      isThemeArray: state.setThemeArray,
      isChecked: state.setChecked,
      isItemClicked: state.setItemClicked,
      isHuntTitle: state.setHuntTitle
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
    }
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatedHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    list: {
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        width: "85%",
        margin: 15,
    },
    listItem: {
        padding: 5,
    },
    itemImage: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'orange',
        width: 200,
        height: 200,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 20
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba(255,120,63, 1)",
        alignItems: "center"
    },
})