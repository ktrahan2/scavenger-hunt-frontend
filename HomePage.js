import { TabActions } from '@react-navigation/native';
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomePage({navigation}) {
    
      return (
        <View style={styles.container}>
            <Text>Description of app</Text>
            <Text>Example of scavenger hunt</Text>
        </View>
      )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
