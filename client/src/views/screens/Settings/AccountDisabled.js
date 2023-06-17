import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { PrimaryButton } from '../../components/Button';
import { DisableAccountAction } from '../../../redux/actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../components/Loading';
import { IconAntDesign } from '../../components/Icons';

const AccountDisabled = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, status, message } = useSelector((state) => state.auth);



    const DisableAccount = () => {
        dispatch(DisableAccountAction());
    }

    useEffect(() => {
        if (status && status === 204) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            navigation.navigate("Login");
        }
    }, [navigation, status, message])









    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />




                <View style={styles.headerContainer}>

                    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.headerTitle}>Disable Account</Text>
                        </View>
                    </View>

                </View>








                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 30 }}>
                    <Image style={{ paddingVertical: 100 }} resizeMode='contain' source={require('../../../assets/images/account_disabled.png')} />
                    <Text style={styles.label}>Are you sure, you will miss the daily moments of your friends and <Text style={{ color: Colors.primary }}>YOLLO</Text>ers</Text>
                    <PrimaryButton title='Continue' margintop={10} marginbottom={10} onPress={DisableAccount} />
                </View>





            </SafeAreaView >
    )
}

export default AccountDisabled

const styles = StyleSheet.create({
    container: { alignContent: "center", justifyContent: "center", padding: 20, backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    label: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, marginBottom: 5, textAlign: 'center', fontWeight: '600', lineHeight: 25 },
})