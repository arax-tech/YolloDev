import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

import Video from 'react-native-video';


const Loading = () => {
    return (
        // <View style={styles.container}>
        //     <Image style={{ width: 150 }} resizeMode='contain' source={require('../../assets/images/icons/svg/loading.gif')} />
        //     <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
        // </View>





        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <ActivityIndicator size="large" color={Colors.primary} />
            {/* <Text style={styles.loadingText}>Loading...</Text> */}
        </View>

    )
}

export default Loading

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: "center", backgroundColor: "#fcfcff" },
    loadingText: { fontFamily: Fonts.primary, fontSize: 15 },
})