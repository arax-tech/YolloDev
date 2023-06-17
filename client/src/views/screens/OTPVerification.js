import { StatusBar, StyleSheet, ToastAndroid, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { PrimaryButton } from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import { AuthUserAction, LoginAction, VerificationAction } from '../../redux/actions/AuthAction'
import { CLEAR_ERRORS } from '../../redux/constants/AuthConstant'

const OTPVerification = ({ navigation }) => {
    const Pin1Ref = useRef(null);
    const Pin2Ref = useRef(null);
    const Pin3Ref = useRef(null);
    const Pin4Ref = useRef(null);

    const [Pin1, setPin1] = useState(1);
    const [Pin2, setPin2] = useState(7);
    const [Pin3, setPin3] = useState(8);
    const [Pin4, setPin4] = useState(6);


    const [timerCount, setTimer] = useState(30)
    const [lastTimerCount, setlastTimerCount] = useState(30)

    const dispatch = useDispatch();

    const { loading, isAuthenticated, errors, status, message, type, phone, email, user, code } = useSelector((state) => state.auth);


    const OTPVerificationFunction = () => {
        if (Pin1 === null) {
            ToastAndroid.show("OTP is required...", ToastAndroid.SHORT);
        } else if (Pin2 === null) {
            ToastAndroid.show("OTP is required...", ToastAndroid.SHORT);
        } else if (Pin3 === null) {
            ToastAndroid.show("OTP is required...", ToastAndroid.SHORT);
        } else if (Pin4 === null) {
            ToastAndroid.show("OTP is required...", ToastAndroid.SHORT);
        } else {
            const newOtp = Pin1 + Pin2 + Pin3 + Pin4;
            dispatch(VerificationAction(newOtp, email, phone, type, code));
        }
    }

    const ResendOtpFunction = () => {
        if (type === 'phone') {
            if (phone === null) {
                ToastAndroid.show("Phone is required...", ToastAndroid.SHORT);
            } else {
                dispatch(LoginAction(phone, email, type, code));
            }

        } else {
            if (email === null) {
                ToastAndroid.show("Email is required...", ToastAndroid.SHORT);
            } else {
                dispatch(LoginAction(phone, email, type, code));
            }
        }
    }


    useEffect(() => {
        if (status && status === 202) {
            dispatch(AuthUserAction());
            ToastAndroid.show(message, ToastAndroid.SHORT);
            if (user?.new_user === true) {
                navigation.navigate("ProfileEdit");
            } else {
                navigation.navigate("HomeNavigation");
            }

        }
        if (status && status === 401) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: CLEAR_ERRORS });
        }

    }, [dispatch, navigation, isAuthenticated, status, errors, user, message])


    useEffect(() => {
        let interval = setInterval(() => {
            setTimer(lastTimerCount => {
                lastTimerCount <= 1 && clearInterval(interval)
                setlastTimerCount(lastTimerCount - 1);
                return lastTimerCount - 1
            })
        }, 1000)
        return () => clearInterval(interval)
    }, []);



    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white, padding: 20 }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                <Text style={styles.heading}>Verification code</Text>

                <Text style={styles.title}>Please enter the 4 digit code send to</Text>

                <Text style={styles.subtitle}>
                    {type == "phone" ? phone : email}
                </Text>

                <View style={styles.container}>


                    <View>
                        <TextInput style={styles.TextInput} keyboardType='number-pad' maxLength={1} ref={Pin1Ref} value={Pin1} onChangeText={(pin1) => {
                            setPin1(pin1);
                            if (pin1 !== "") {
                                Pin2Ref.current.focus();
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput style={styles.TextInput} keyboardType='number-pad' maxLength={1} ref={Pin2Ref} value={Pin2} onChangeText={(pin2) => {
                            setPin2(pin2);
                            if (pin2 !== "") {
                                Pin3Ref.current.focus();
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput ref={Pin3Ref} style={styles.TextInput} keyboardType='number-pad' maxLength={1} value={Pin3} onChangeText={(pin3) => {
                            setPin3(pin3);
                            if (pin3 !== "") {
                                Pin4Ref.current.focus();
                            }
                        }} />
                    </View>
                    <View>
                        <TextInput ref={Pin4Ref} style={styles.TextInput} keyboardType='number-pad' maxLength={1} value={Pin4} onChangeText={(pin4) => setPin4(pin4)} />
                    </View>
                </View>

                <View style={{ padding: 15, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Text style={styles.otptext}> Didn’t receive the OTP ?</Text>
                    <TouchableOpacity onPress={() => { lastTimerCount > 0 ? '' : ResendOtpFunction() }}>
                        <Text style={styles.instenet}> {lastTimerCount > 0 ? timerCount : "Resend OTP"}</Text>
                    </TouchableOpacity>
                </View>




                <PrimaryButton title='Continue' margintop={10} onPress={() => OTPVerificationFunction()} />


            </SafeAreaView>
    )
}

export default OTPVerification

const styles = StyleSheet.create({
    container: { justifyContent: 'center', alignContent: 'center', flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 },
    heading: { fontFamily: Fonts.primary, fontSize: 35, fontWeight: '800', textAlign: 'left', marginTop: 20, marginBottom: 10 },
    title: { fontFamily: Fonts.primary, fontSize: 18, fontWeight: '600', lineHeight: 24, marginBottom: 0 },
    subtitle: { fontFamily: Fonts.primary, fontSize: 18, fontWeight: '600', lineHeight: 24, marginBottom: 0, marginTop: 8 },
    TextInput: { backgroundColor: Colors.white, fontSize: 30, borderBottomWidth: 1, width: 50, justifyContent: 'center', alignContent: 'center', textAlign: 'center' },
    otptext: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '500' },
    instenet: { fontFamily: Fonts.primary, color: '#5458F7', fontSize: 14, marginLeft: 3, marginTop: 10, fontWeight: '900' },
})