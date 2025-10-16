import { StyleSheet, View } from 'react-native'
import { Component } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import { colors } from '../global/color';

export class IconCamera extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome name="camera" size={24} color="black" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  }
})

export default IconCamera