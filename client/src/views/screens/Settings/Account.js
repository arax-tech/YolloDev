import { StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, TextInput, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'


import { Dropdown } from 'react-native-element-dropdown';

import { PrimaryButton } from '../../components/Button';
import { AccountUpdateAction, AuthUserAction } from '../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { UPDATE_ACCOUNT_RESET } from '../../../redux/constants/AuthConstant';
import { IconAntDesign, IconFeather, IconFontAwesome5, IconIonicons } from '../../components/Icons';

const Account = ({ navigation }) => {

    const { loading, user } = useSelector((state) => state.user);
    const { loading: updateLoading, message, isUpdated } = useSelector((state) => state.updateProfile);
    const dispatch = useDispatch();


    const [visibility, setVisibility] = useState(user?.profile_visibility ? user?.profile_visibility : null);
    const [reactionVisibility, setReactionVisibility] = useState(user?.reaction_visibility ? user?.reaction_visibility : null);
    const [data, setData] = useState({
        email: user?.email ? user?.email : null,
        phone: user?.phone ? user?.phone : null,
        recovery_email: user?.recovery_email ? user?.recovery_email : null,
    });

    const InpChnage = (text, field) => {
        setData({ ...data, [field]: text });
    }

    const UpdateAccount = async () => {
        if (data.email === null) {
            ToastAndroid.show('Email is required...', ToastAndroid.SHORT);
        } else if (data.recovery_email === null) {
            ToastAndroid.show('Recovery Email is required...', ToastAndroid.SHORT);
        } else if (data.phone === null) {
            ToastAndroid.show('Phone is required...', ToastAndroid.SHORT);
        } else if (visibility === null) {
            ToastAndroid.show('Profile Visibility is required...', ToastAndroid.SHORT);
        } else {
            await dispatch(AccountUpdateAction(data.email, data.recovery_email, data.phone, visibility, reactionVisibility));
            await dispatch(AuthUserAction());
        }
    }

    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UPDATE_ACCOUNT_RESET });
        }
    }, [dispatch, isUpdated, message])






    const visibilityArrray = [
        { label: 'Everyone', value: 'Everyone' },
        { label: 'Followers', value: 'Followers' },
        { label: 'Only Me', value: 'Only Me' },
    ]








    return (
        loading && updateLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />




                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Account</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.container}>









                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput style={styles.formInput} keyboardType='email-address' value={data.email} onChangeText={(text) => InpChnage(text, 'email')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Recovery mail</Text>
                            <TextInput style={styles.formInput} keyboardType='email-address' value={data.recovery_email} onChangeText={(text) => InpChnage(text, 'recovery_email')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput style={styles.formInput} value={data.phone} onChangeText={(text) => InpChnage(text, 'phone')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Profile visibility</Text>

                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.selectedTextStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={visibilityArrray}
                                maxHeight={300}
                                labelField="label"
                                search={false}
                                placeholder="Visibility"
                                valueField="value"
                                value={visibility}
                                onChange={item => { setVisibility(item.value) }}
                            />

                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Reaction visibility</Text>

                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.selectedTextStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                data={visibilityArrray}
                                maxHeight={300}
                                labelField="label"
                                search={false}
                                placeholder="Visibility"
                                valueField="value"
                                value={visibility}
                                onChange={item => { setReactionVisibility(item.value) }}
                            />

                        </View>



                    </View>


                    <TouchableOpacity style={[styles.settingList, { marginTop: 1, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#F5F5F5' }]} onPress={() => navigation.navigate('AccountDisabled')}>
                        <Text style={styles.settingListTitle}>Disable account </Text>
                        <View style={styles.contentRight}>
                            <IconFontAwesome5 name='chevron-right' size={20} color='#6C63FF' />
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={[styles.settingList, { marginTop: 1, borderTopWidth: 2, borderBottomWidth: 2, borderColor: '#F5F5F5' }]} onPress={() => navigation.navigate('DeleteAccount')}>
                        <Text style={styles.settingListTitle}>Permanently delete account </Text>
                        <View style={styles.contentRight}>
                            <IconFeather name='trash-2' size={20} color='#FF375F' />
                            {/* <Image source={require('../../assets/images/icons/settings/delete-regular.png')} /> */}
                        </View>
                    </TouchableOpacity>


                    <View style={styles.container}>
                        <PrimaryButton title='Update' margintop={10} marginbottom={10} onPress={UpdateAccount} />

                    </View>


                </ScrollView>
            </SafeAreaView >
    )
}

export default Account

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