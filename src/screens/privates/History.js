import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { COLOR_SECONDARY } from '../../styles/constant'

const History = () => {
  return (
    <View>
      <StatusBar translucent backgroundColor={COLOR_SECONDARY} />
      <Text>History</Text>
    </View>
  )
}

export default History
