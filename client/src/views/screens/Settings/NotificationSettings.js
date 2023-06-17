import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { AuthUserAction, NotificationSettingUpdateAction } from '../../../redux/actions/AuthAction';
import { UPDATE_NOTIFICATION_SETTING_RESET } from '../../../redux/constants/AuthConstant';
import { IconAntDesign } from '../../components/Icons';

const NotificationSettings = ({ navigation }) => {

    const dispatch = useDispatch();

    const { loading, user } = useSelector((state) => state.user);
    const { loading: updateLoading, message, isUpdated } = useSelector((state) => state.updateProfile);

    const [items, setItems] = useState([
        { id: 1, checked: user?.notification_settings[0] ? user?.notification_settings[0].checked : true, name: "Push Notification", },
        { id: 2, checked: user?.notification_settings[0] ? user?.notification_settings[1].checked : true, name: "Post from people you may know", },
        { id: 3, checked: user?.notification_settings[0] ? user?.notification_settings[2].checked : true, name: "Likes", },
        { id: 4, checked: user?.notification_settings[0] ? user?.notification_settings[3].checked : true, name: "Comments", },
        { id: 5, checked: user?.notification_settings[0] ? user?.notification_settings[4].checked : true, name: "New followers", },
        { id: 6, checked: user?.notification_settings[0] ? user?.notification_settings[5].checked : true, name: "Time", },
        { id: 7, checked: user?.notification_settings[0] ? user?.notification_settings[6].checked : true, name: "Add diamond", },
        { id: 8, checked: user?.notification_settings[0] ? user?.notification_settings[7].checked : true, name: "Mentions & tags", },
        { id: 9, checked: user?.notification_settings[0] ? user?.notification_settings[8].checked : true, name: "Repost", },
    ]);

    const getValue = async (id) => {

        let newItems = [...items];
        let index = newItems.findIndex(el => el.id === id);

        if (newItems[index].checked === true) {
            newItems[index] = { ...newItems[index], checked: false };
        } else {
            newItems[index] = { ...newItems[index], checked: true };
        }

        setItems(newItems);
        await dispatch(NotificationSettingUpdateAction(newItems));
    }





    useEffect(() => {
        if (isUpdated && isUpdated === true) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UPDATE_NOTIFICATION_SETTING_RESET });

        }
    }, [dispatch, isUpdated, message])








    return (
        loading && updateLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />



                <View style={[styles.headerContainer, { paddingBottom: 10 }]}>

                    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, }}>
                            <Text style={styles.headerTitle}>Notification Settings</Text>
                        </View>
                    </View>

                </View>






                {
                    items.map((item) => (
                        <TouchableOpacity key={item.id} style={[styles.settingList, { marginTop: 3 }]} onPress={() => getValue(item.id)}>
                            <Text style={styles.settingListTitle}>{item.name}</Text>
                            <View style={styles.contentRight}>

                                {
                                    item.checked == true ? (
                                        <Image source={require('../../../assets/images/icons/settings/radio-checked.png')} />
                                    ) : (
                                        <Image source={require('../../../assets/images/icons/settings/radio-unchecked.png')} />
                                    )
                                }
                            </View>
                        </TouchableOpacity>
                    ))
                }




            </SafeAreaView >
    )
}

export default NotificationSettings

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