import { StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { IconAntDesign } from '../../components/Icons';
import { WebView } from 'react-native-webview';


const TermAndCondition = ({ navigation }) => {



    return (

        <React.Fragment>
            <StatusBar hidden />
            <WebView source={{ uri: 'http://192.168.54.36:3000/page/terms-and-conditions' }} />
        </React.Fragment>
    )
}

export default TermAndCondition

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},



    settingList: { flexDirection: 'row', alignItems: 'center', padding: 17, paddingRight: 20, backgroundColor: Colors.white, },
    settingIcon: {},
    settingListTitle: { paddingLeft: 10, color: Colors.dark, fontFamily: Fonts.primary, fontSize: 15, fontWeight: '600' },
    contentRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', },


    inputGroup: { paddingVertical: 6 },
    formLabel: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, fontWeight: '700', marginBottom: 5, },
    formInput: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, borderColor: '#BABABA', borderWidth: 1, borderRadius: 10, paddingLeft: 20, width: '100%', height: 52 },
    dateTxt: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, lineHeight: 50 },

    dropdown: { height: 52, borderColor: '#BABABA', borderWidth: 1, borderRadius: 8, paddingLeft: 20, paddingRight: 10 },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
})