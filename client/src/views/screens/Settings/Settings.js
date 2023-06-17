import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, Dimensions, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import { AuthLogoutAction } from '../../../redux/actions/AuthAction';
import Loading from '../../components/Loading';
import { IconAntDesign, IconEntypo, IconFeather, IconFontAwesome5, IconSimpleLineIcons } from '../../components/Icons';
import { SVGReferral, SVGSettingAccount, SVGSettingLogout, SVGSettingMemories, SVGSettingNotification, SVGSettingPrivacy, SVGSettingQuestion, SVGSettingShare, SVGSettingSupport, SVGSettingTerms } from '../../components/Svgs';
import { StackActions } from '@react-navigation/native';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const Settings = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, message, status } = useSelector((state) => state.auth);

    const LogoutFunction = () => {
        dispatch(AuthLogoutAction());
    }

    useEffect(() => {
        if (status && status === 203) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            navigation.replace('Login');
        }
    }, [dispatch, navigation, status, message])
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <ScrollView>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />



                    <View style={[styles.headerContainer, { paddingBottom: 10 }]}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Settings</Text>
                            </View>
                        </View>

                    </View>







                    <TouchableOpacity style={[styles.settingList, { marginTop: 1 }]} onPress={() => navigation.navigate('Account')}>
                        {/* <Image style={styles.settingIcon} source={require('../../../assets/images/icons/settings/user-settings.png')} /> */}
                        <SVGSettingAccount style={styles.settingIcon} />
                        <Text style={styles.settingListTitle}>Account </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]} onPress={() => navigation.navigate("Memories")}>
                        <SVGSettingMemories />
                        <Text style={styles.settingListTitle}>Memories </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]} onPress={() => navigation.navigate('NotificationSettings')}>
                        <SVGSettingNotification />
                        <Text style={styles.settingListTitle}>Notification Setting </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]}>
                        <SVGSettingShare />
                        <Text style={styles.settingListTitle}>Share Profile </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]} onPress={() => navigation.navigate("Referral")}>
                        <SVGReferral style={{ width: 5, height: 5, marginBottom: 2, }} />
                        {/* <Image style={{ width: 20 }} resizeMode='contain' source={require("../../../assets/images/referral.png")} /> */}
                        <Text style={styles.settingListTitle}>Referral Code </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]}>
                        <SVGSettingQuestion />

                        <Text style={styles.settingListTitle}>FAQs </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]}>
                        <SVGSettingTerms />
                        <Text style={styles.settingListTitle}>Terms and Conditions </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]}>
                        <SVGSettingPrivacy />
                        <Text style={styles.settingListTitle}>Privacy Policy </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]} onPress={() => navigation.navigate('SupportAndHelp')}>
                        <SVGSettingSupport />
                        <Text style={styles.settingListTitle}>Support & Help </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.settingList, { marginTop: 5 }]} onPress={LogoutFunction}>
                        <SVGSettingLogout />
                        <Text style={styles.settingListTitle}>Logout </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView >

    )
}

export default Settings

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

})