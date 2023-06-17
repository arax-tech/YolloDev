import { ActivityIndicator, View } from 'react-native'
import React from 'react'

const MiniLoading = () => {
    return (
        <View style={{padding:20}}>
            <ActivityIndicator color={"#ffb300"} size={'large'} />
        </View>
    )
}

export default MiniLoading