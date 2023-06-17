import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'

const AuthWelcome = ({ navigation }) => {
    const [show, setShow] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 3000)

        show === false ? (
            navigation.navigate("HomeNavigation")
        ) : null
    }, [navigation, show])
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={styles.container}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                {/* <Image style={styles.logo} source={require('../../assets/logo.png')} /> */}
                <Image style={[styles.logo, { width: 130, height: 130 }]} source={require('../../assets/logo0.png')} />
                <Text style={styles.title}>
                    Welcome back to <Text style={{ color: Colors.primary }}>YOLLO</Text> to see the latest and trendy moments from your friends and <Text style={{ color: Colors.primary }}>YOLLO</Text>ers
                </Text>
                <View style={styles.bottomImage}>
                    <Image source={require('../../assets/shape.png')} />
                </View>
            </View>
        </SafeAreaView>

    )
}

export default AuthWelcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: Fonts.primary,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
        padding: 20

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
    }
})