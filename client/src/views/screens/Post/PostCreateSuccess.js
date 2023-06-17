import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React from 'react'
import { PrimaryButton } from '../../components/Button'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { IconAntDesign } from '../../components/Icons'
import { SVGPostSuccess } from '../../components/Svgs'

const PostCreateSuccess = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


            <View style={styles.postHeaderContainer}>

                <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.navigate('Home')}>
                    <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                </TouchableOpacity>
                <Text style={styles.postTitle}>Share Post</Text>

            </View>


            <View style={styles.postContainer}>
                <View style={{ alignItems: "center", marginTop: 50 }}>
                    <SVGPostSuccess />
                    <Text style={[styles.postSubTitle, { marginTop: 30 }]}>Your photo is succesfully posted</Text>
                </View>





                <PrimaryButton title='Go Back To Home' margintop={150} marginbottom={50} onPress={() => navigation.navigate('HomeNavigation')} />


            </View>


        </SafeAreaView >
    )
}

export default PostCreateSuccess

const styles = StyleSheet.create({
    postContainer: { padding: 20, },
    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, padding: 20 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    postBackButton: {},
    postSubTitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', color: Colors.dark, },
    postPhotoList: {},
})