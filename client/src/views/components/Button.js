import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Fonts from '../../constants/Fonts'

const PrimaryButton = ({ title, margintop = 0, marginbottom = 0, onPress = () => { } }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { marginTop: margintop, marginBottom: marginbottom }]} activeOpacity={0.9} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    )
}


const PrimaryInfo = ({ title, margintop = 0, marginbottom = 0, onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.buttonInfo, { zIndex: 999, marginTop: margintop, marginBottom: marginbottom }]}>
            <Text style={styles.buttonInfoText}>{title}</Text>
        </TouchableOpacity>


    )
}

const CloseButton = ({ onPress = () => { } }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 5, borderRadius: 100 }}>
            <Icon size={20} color={Colors.dark} name={'close'} />
        </TouchableOpacity>
    )
}

export { PrimaryButton, CloseButton, PrimaryInfo }

const styles = StyleSheet.create({
    buttonContainer: { backgroundColor: Colors.primary, padding: 15, borderRadius: 30, width: '100%', },
    buttonText: { fontFamily: Fonts.primary, color: Colors.white, textAlign: 'center', fontSize: 20 },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 10, paddingHorizontal: 20, margin: 10, borderRadius: 20, zIndex : 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.white, textAlign: 'center', fontWeight: '700' },
})