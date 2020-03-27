import React, { Component } from 'react'
import { Text, StyleSheet, View,Appearance } from 'react-native'
import LottieView from 'lottie-react-native';

import Box from './Box'

const colorScheme = Appearance.getColorScheme();

export default class App extends Component {
  render() {
    return (
      <View style={styles.main}>
          <Box/>
       

      </View>
    )
  }
}

const styles = StyleSheet.create({
  main:{
    backgroundColor:'#EEF2F3',
    flex:1
  }
})
