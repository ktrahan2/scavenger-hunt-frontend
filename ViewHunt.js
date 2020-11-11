import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground, ScrollView } from 'react-native';
import RenderList from './CreateList/RenderList'

function CreatedHunt({
    isThemeArray,
    navigation,
    isHuntTitle,
    isHuntListId,
    isUserId,
    setItemId,
    isItemIds,
    setNavigationLocation,
    setNavigationTimer,
    setLoadingImage
    }) {

    useEffect( () => {
        isThemeArray.map(item => {
            setItemId(item.ID)
        })
        },
        []
    )
    
    const generateHuntList = () => {
        return <RenderList array={isThemeArray}/>
    }

    const handleSaveList = () => {    
        fetch("http://localhost:7000/create-user-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                HuntListID: isHuntListId,
                UserID: isUserId
            })
        }).then(response => response.json())
            .then(fetch("http://localhost:7000/create-selected-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    HuntListID: isHuntListId,
                    HuntItemIDs: isItemIds
                })
            }))
            setNavigationLocation("My Hunts")
            setNavigationTimer(3000)
            setLoadingImage("Enjoy Bear")
            navigation.navigate("Splash Screen")
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
                padding= "15"
            >
                <Text style={styles.h2}>{isHuntTitle}</Text>
                <View style={styles.borderLine}></View>
                {generateHuntList()}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSaveList}
                    >
                        <Text style={styles.buttonText}>Save List</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('On The Hunt')}
                    >
                        <Text style={styles.buttonText}>Get New List</Text>
                    </TouchableOpacity>
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
      isHuntTitle: state.setHuntTitle,
      isHuntListId: state.setHuntListId,
      isUserId: state.setUserId,
      isItemIds: state.setItemId
    }
}
  
function mapDispatchToProps(dispatch) {
    return {   
        setItemId: (id) => dispatch({
            type: "SETITEMID",
            payload: id
        }),
        setUser: (user) => dispatch({
            type: "SETUSER",
            payload: user
        }),
        setHuntTitle: () => dispatch({
            type: "SETTITLE",
            payload: ""
        }),
        setNavigationLocation: (location) => dispatch({
            type: "SETLOCATION",
            payload: location
        }),
        setNavigationTimer: (time) => dispatch({
            type: "SETTIMER",
            payload: time
        }),
        setLoadingImage: (image) => dispatch({
            type: "SETLOADINGIMAGE",
            payload: image
        })
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
        paddingRight: 10

    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)", 
        alignSelf: "center"
    },
    borderLine: { 
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
        height: 40,
        justifyContent: "center",
        alignItems: "center",  
        backgroundColor: 'rgba(200, 230, 240, 1)',
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        padding: 5
      },
    buttonText: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 16,
    }
})