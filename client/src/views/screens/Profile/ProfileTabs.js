import { StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView } from 'react-native'

import Followers from './Followers'
import Following from './Following'
import Suggested from './Suggested'

import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';

import Loading from '../../components/Loading';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { IconAntDesign } from '../../components/Icons';
import { AllSuggessionAction } from '../../../redux/actions/YelloAction';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { AuthUserAction } from '../../../redux/actions/AuthAction';
const Tab = createMaterialTopTabNavigator();


const ProfileTabs = () => {

    const { loading, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(() => {
        const getSuggestion = navigation.addListener('focus', async () => {
            dispatch(AuthUserAction());
            dispatch(AllSuggessionAction());
        });
        return getSuggestion
    }, [navigation, dispatch])


    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />




                <View style={styles.container}>


                    <View style={styles.postHeaderContainer}>

                        <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <Text style={styles.postTitle}>{user?.username}</Text>

                    </View>



                </View>


                <Tab.Navigator
                    screenOptions={{
                        tabBarStyle: {
                            borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#D9D9D9'
                        },
                        tabBarShowLabel: false,
                        headerShown: false,
                        tabBarIndicatorStyle: {
                            backgroundColor: '#9E9A9A',
                            height: 2,
                            flex: 1
                        },
                    }}>
                    <Tab.Screen
                        name="Followers"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Text style={{ fontSize: 14, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', marginLeft: -20, marginRight: -20 }}>Followers</Text>
                            )
                        }}
                        component={Followers} />

                    <Tab.Screen
                        name="Following"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Text style={{ fontSize: 14, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', marginLeft: -20, marginRight: -20 }}>Following</Text>
                            )
                        }}
                        component={Following} />


                    <Tab.Screen
                        name="Suggested"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Text style={{ fontSize: 14, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', marginLeft: -25, marginRight: -22 }}>Suggested</Text>
                            )
                        }}
                        component={Suggested} />


                </Tab.Navigator>






            </SafeAreaView >
    )
}

export default ProfileTabs

const styles = StyleSheet.create({
    container: { padding: 20 },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 10, paddingHorizontal: 20, margin: 10, borderRadius: 20, zIndex: 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.white, textAlign: 'center', fontWeight: '700' },

    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 18, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    postBackButton: {},
})