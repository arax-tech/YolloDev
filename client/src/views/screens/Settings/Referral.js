import { StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid, TextInput } from 'react-native'
import React from 'react'
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import { AuthLogoutAction } from '../../../redux/actions/AuthAction';
import Loading from '../../components/Loading';
import { IconAntDesign } from '../../components/Icons';

const Referral = ({ navigation }) => {

    const { loading, user } = useSelector((state) => state.user);

    const CopyReferralCode = (code) => {
        Clipboard.setString(code);
        ToastAndroid.show("Referral Code Copied", ToastAndroid.SHORT);
    }

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />



                <View style={[styles.headerContainer, { paddingBottom: 10, borderBottomColor: "#F5F5F5", borderBottomWidth: 3 }]}>

                    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.headerTitle}>Referral</Text>
                        </View>
                    </View>

                </View>






                <View style={styles.container}>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                        <View style={[styles.inputGroup, { width: '80%' }]}>
                            <Text style={styles.formLabel}>Referral Code</Text>
                            <TextInput editable={false} style={styles.formInput} value={user?._id} />
                        </View>
                        <TouchableOpacity style={[styles.inputGroup, { width: '18%' }]} onPress={() => CopyReferralCode(user?._id)}>
                            <Text style={[styles.formLabel, { color: 'transparent' }]}>City</Text>
                            <Text style={[styles.formInput, { lineHeight: 50, color: Colors.white, borderColor: Colors.primary, paddingLeft: 15, backgroundColor: Colors.primary }]} >Copy</Text>
                        </TouchableOpacity>
                    </View>



                </View>

            </SafeAreaView >

    )
}

export default Referral

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},


    settingHeaderContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white },
    settingTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    settingBackButton: {},



    settingList: { flexDirection: 'row', alignItems: 'center', padding: 17, backgroundColor: Colors.white, },
    settingIcon: {},
    settingListTitle: { paddingLeft: 15, fontFamily: Fonts.primary, fontSize: 15, fontWeight: '700', alignItems: 'center', justifyContent: 'center' },
    contentRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', },



    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    chnageProfileTxt: { fontFamily: Fonts.primary, fontSize: 16, color: '#6C63FF' },

    inputGroup: { paddingVertical: 10 },
    formLabel: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, fontWeight: '700', marginBottom: 5, },
    formInput: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, borderColor: '#BABABA', borderWidth: 1, borderRadius: 10, paddingLeft: 20, width: '100%', height: 52 },
    dateTxt: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, lineHeight: 50 },

})