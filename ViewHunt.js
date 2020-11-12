import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import RenderList from './Components/CreateList/RenderList'
import MyTouchableOpacity from './Components/MyTouchableOpacity'
import { postFetch } from "./FetchList"

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
    
    const renderList = () => {
        return <RenderList array={isThemeArray}/>
    }

    const handleSaveList = () => {
        
        let url1 = "create-user-list"
        let body1 = {
            HuntListID: isHuntListId,
            UserID: isUserId
        }
        let url2 = "create-selected-item"
        let body2 = {
            HuntListID: isHuntListId,
            HuntItemIDs: isItemIds
        }
        postFetch( url1, body1 )
        .then(postFetch( url2, body2 ))
    
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
                >
                    <Text style={styles.h2}>{isHuntTitle}</Text>
                    <View style={styles.borderLine}></View>
                    {renderList()}
                    <View style={styles.buttonContainer}>
                        <MyTouchableOpacity 
                            buttonText={"Save List"} 
                            handlePress={handleSaveList}
                        />
                        <MyTouchableOpacity
                            buttonText={"Get New List"}
                            handlePress={() => navigation.navigate('On The Hunt')}
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
        paddingRight: 18
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
    
})