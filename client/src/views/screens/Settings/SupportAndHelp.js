import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'


import { PrimaryButton } from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { SupportAction } from '../../../redux/actions/SupportAction';
import { HELP_AND_SUPPORT_RESET } from '../../../redux/constants/SupportConstant';
import Loading from '../../components/Loading';
import { IconAntDesign, IconFeather, IconMaterialIcons } from '../../components/Icons';

const SupportAndHelp = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, user } = useSelector((state) => state.user);
    const { loading: createLoading, message, isCreated } = useSelector((state) => state.support);


    const [data, setData] = useState({
        name: user?.first_name ? user?.first_name : null,
        email: user?.email ? user?.email : null,
        subject: "",
        message: "",
    });

    const InpChnage = (text, field) => {
        setData({ ...data, [field]: text });
    }

    const SubmitHelpAndSupport = () => {
        if (data.name === null) {
            ToastAndroid.show('Name is required...', ToastAndroid.SHORT);
        } else if (data.email === null) {
            ToastAndroid.show('Email is required...', ToastAndroid.SHORT);
        } else if (data.subject === null) {
            ToastAndroid.show('Subject is required...', ToastAndroid.SHORT);
        } else if (data.message === null) {
            ToastAndroid.show('Message is required...', ToastAndroid.SHORT);
        } else {
            dispatch(SupportAction(data.name, data.email, data.subject, data.message));
        }
    }

    useEffect(() => {
        if (isCreated && isCreated === true) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: HELP_AND_SUPPORT_RESET });
            navigation.navigate("Settings")
        }
    }, [dispatch, isCreated, message])


    return (
        loading && createLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                <ScrollView>
                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Support & Help</Text>
                            </View>
                        </View>

                    </View>


                    {/* <TouchableOpacity style={[styles.settingList, { marginTop: 1, borderBottomWidth: 10, borderColor: '#F5F5F5', paddingTop: 40 }]} onPress={() => navigation.navigate('Account')}>
                        <IconFeather name='phone' size={20} color={Colors.dark} />
                        <Text style={styles.settingListTitle}>+351 210 935 394 </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity style={[styles.settingList, { marginTop: 1, borderBottomWidth: 10, borderColor: '#F5F5F5' }]} onPress={() => navigation.navigate('Account')}>
                        <IconFeather name='mail' size={20} color={Colors.dark} />
                        <Text style={styles.settingListTitle}>admin@yolloverse.com </Text>
                    </TouchableOpacity>


                    <View style={styles.container}>









                        <View style={styles.inputGroup}>
                            <TextInput style={styles.formInput} keyboardType='email-address' placeholder='Name' value={data.name} onChangeText={(text) => InpChnage(text, 'name')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextInput style={styles.formInput} keyboardType='email-address' placeholder='Email' value={data.email} onChangeText={(text) => InpChnage(text, 'email')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextInput style={styles.formInput} placeholder='Subject' value={data.subject} onChangeText={(text) => InpChnage(text, 'subject')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <TextInput style={[styles.formInput, { height: 120, textAlignVertical: "top" }]} placeholder='Your Message' multiline={true} numberOfLines={4} value={data.message} onChangeText={(text) => InpChnage(text, 'message')} />
                        </View>



                        <TouchableOpacity style={styles.inputGroup}>
                            <View style={[styles.formInput, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 15 }]}>
                                <Text>Attachment (optional)</Text>
                                <IconMaterialIcons name='attach-file' size={20} color={Colors.dark} style={{ opacity: 0.4 }} />
                            </View>
                        </TouchableOpacity>

                    </View>





                    <View style={styles.container}>
                        <PrimaryButton title='Send' margintop={10} marginbottom={10} onPress={SubmitHelpAndSupport} />

                    </View>
                </ScrollView>


            </SafeAreaView >
    )
}

export default SupportAndHelp

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

    formSelect: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, width: '100%', height: 52, borderColor: '#BABABA', borderWidth: 1, borderRadius: 10, paddingLeft: 20, paddingTop: 15 },

    formSelectDropDown: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, width: '100%', borderColor: '#BABABA', borderWidth: 1, color: Colors.dark, },

    dropdownItemStyles: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, width: '100%' },
})