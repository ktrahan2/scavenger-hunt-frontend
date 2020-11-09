import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux'

function MyHunts({
        isUserId,
        setHuntListTitles,
        isHuntListTitles
    }) {

    useEffect( () => {
        fetch(`https://on-the-hunt.herokuapp.com/user/${isUserId}`)
            .then(response => response.json())
            .then(user => {
                user.HuntLists.map(list => {
                    setHuntListTitles(list.title)
                })
            })
        },
        []
    )

    const renderHuntListTitles = () => {
        return isHuntListTitles.map(title => {
            return <Text key={title}>{title}</Text>
        })
    }

    return (
        <ImageBackground
            style={styles.image}
            source={require("./blue-sky.jpg")}
        >
            <View style={styles.screenContainer}>
                <Text style={styles.h2}>Your Hunts</Text>
                <View style={styles.borderLine}></View>
                {renderHuntListTitles()}
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        isUserId: state.setUserId,
        isHuntListTitles: state.setHuntListTitles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setHuntListTitles: (title) => dispatch({
            type: "SETTITLE",
            payload: title
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHunts);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)", 
        alignSelf: "center"
    },
    borderLine: { 
        width: "75%",
        borderBottomWidth: 2, 
        borderBottomColor: "rgba(0, 0, 0, .3)",
        marginTop: -20,
        marginBottom: 15, 
        borderStyle: "solid"
    },
})