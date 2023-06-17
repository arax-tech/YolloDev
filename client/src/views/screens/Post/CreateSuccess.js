import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

import { PrimaryButton } from '../../components/Button'



const CreateSuccess = ({ navigation }) => {
    const richText = React.useRef();


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

            <ScrollView>
                <View style={styles.postHeaderContainer}>

                    <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.navigate('Home')}>
                        <Image style={{ width: 20, tintColor: Colors.dark }} resizeMode='contain' source={require('../../../assets/images/icons/arrow-left.png')} />
                    </TouchableOpacity>
                    <Text style={styles.postTitle}>Share Post</Text>

                </View>


                <View style={styles.postContainer}>

                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>


                        <Image sty resizeMode='contain' source={require('../../../assets/images/post_success.png')} />
                        <Text style={styles.postSubTitle}>Your moment is succesfully posted</Text>
                    </View>





                    <PrimaryButton title='Back to Home' margintop={170} marginbottom={30} onPress={() => navigation.navigate('Home')} />


                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

export default CreateSuccess

const styles = StyleSheet.create({
    postContainer: { padding: 20, },
    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, padding: 20 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    postBackButton: {},
    postSubTitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', color: Colors.dark, },
    postPhotoList: {},
    tagButton: { backgroundColor: '#F1F1F1', padding: 5, paddingHorizontal: 10, borderRadius: 5, margin: 2 },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },
})