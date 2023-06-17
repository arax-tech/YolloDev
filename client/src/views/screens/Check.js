import React, { useEffect, useState } from 'react'

import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'

import Colors from '../../constants/Colors'

import Icon from 'react-native-vector-icons/MaterialIcons'
import Fonts from '../../constants/Fonts'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'


const Check = ({ navigation, }) => {
    const [Checked, setChecked] = useState(false);

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    console.log(isAuthenticated)

    useEffect(() => {
        if (isAuthenticated && isAuthenticated === true) {
            navigation.navigate("HomeNavigation");
        }
    }, [navigation, isAuthenticated])

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={styles.container}>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                    <Image style={[styles.logo, { width: 130, height: 130 }]} source={require('../../assets/logo0.png')} />
                    {/* <Image style={styles.logo} source={require('../../assets/logo.png')} /> */}

                    <Text style={styles.title}>
                        You must be 13 to use this app
                    </Text>

                    <TouchableOpacity style={[styles.checkBox]} onPress={() => setChecked(Checked == true ? false : true)}>
                        <Icon
                            size={30}
                            color={Colors.primary}
                            name={Checked == true ? 'check-box' : 'check-box-outline-blank'}
                        />

                        <Text style={styles.textStyle}>Yes, I’m over 13</Text>
                    </TouchableOpacity>

                    {
                        Checked == true ? (
                            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttonContainerLight} onPress={() => alert('Please confirm your age to continue.')}>
                                <Text style={styles.buttonTextLight}>Continue</Text>
                            </TouchableOpacity>
                        )
                    }

                </View>
                <Image style={styles.bottomImage} source={require('../../assets/shape.png')} />
            </SafeAreaView>

    )
}

export default Check

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts.primary,
        fontSize: 20,
        fontWeight: '500',
        lineHeight: 24,
        textAlign: 'center',
        padding: 20,
        color: Colors.dark

    },
    logo: {
        marginTop: -200,
        marginBottom: 10
    },
    bottomImage: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    buttonContainer: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 30,
        top: 250,
        width: '80%',
        zIndex: 999,
    },
    buttonContainerLight: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 30,
        top: 250,
        width: '80%',
        zIndex: 999,
        opacity: 0.5
    },
    buttonTextLight: {
        color: Colors.dark,
        textAlign: 'center',
        fontSize: 20,
        opacity: 1

    },
    buttonText: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: 20,
        opacity: 1

    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        marginTop: 50,
        zIndex: 999,
    },
    textStyle: {
        fontSize: 15,
        marginTop: 4,
        marginLeft: 4
    }
})