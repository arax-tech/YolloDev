import { View, Text } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'

const SearchNearYou = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ color: Colors.dark, fontSize: 20, fontWeight: "900" }}>Comming Soon</Text>
        </View>
    )
}

export default SearchNearYou