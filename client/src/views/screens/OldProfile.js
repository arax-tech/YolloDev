import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { PrimaryInfo } from '../components/Button'

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();


import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import ProfileInfo from '../components/ProfileInfo'

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const Profile = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                {/* Report Model */}
                <Modal
                    backdropColor='rgba(0,0,0,0.7)'
                    isVisible={isModalVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    animationType={"slide"}
                    coverScreen={false}
                    transparent={true}>


                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 300,
                            height: 200,
                            zIndex: 999,
                            backgroundColor: Colors.white
                        }}>


                            <TouchableOpacity onPress={toggleModal} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                                <Image source={require('../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} />
                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} onPress={() => {
                                navigation.navigate('ProfileTabs')
                                toggleModal()
                            }} >
                                <View style={styles.modelInside}>
                                    <Image source={require('../../assets/images/icons/following.png')} resizeMode='contain' style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Followers</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelList}>
                                <View style={styles.modelInside}>
                                    <Image source={require('../../assets/images/icons/public-view.png')} resizeMode='contain' style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Public View</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Settings')
                                toggleModal()
                            }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                <View style={styles.modelInside}>
                                    <Image source={require('../../assets/images/icons/settings.png')} resizeMode='contain' style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Settings</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>


                <View style={styles.container}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -50, marginBottom: -30 }}>
                        <Image style={{ width: 25 }} resizeMode='contain' source={require('../../assets/images/icons/user-plus.png')} />
                        <Image style={{ width: 100 }} resizeMode='contain' source={require('../../assets/logo.png')} />
                        <TouchableOpacity onPress={toggleModal}>
                            <Image style={{ width: 25 }} resizeMode='contain' source={require('../../assets/images/icons/menu-vertical.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '900' }]}>1.2 M</Text>
                            <Text style={styles.text}>Followers</Text>
                        </View>
                        <Image style={{ width: 90 }} resizeMode='contain' source={require('../../assets/images/user/avatar.png')} />
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '900' }]}>120K</Text>
                            <Text style={styles.text}>Reactions</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: '900', marginTop: 10 }]}>Boni twint Tylerr</Text>
                        <Text style={[styles.text, { fontSize: 16, fontWeight: '600' }]}>@Bonitqas3</Text>
                        <TouchableOpacity style={styles.buttonInfo} onPress={() => navigation.navigate('ProfileEdit')}>
                            <Text style={styles.buttonInfoText}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>



                </View>



                <ProfileInfo />

                <Tab.Navigator

                    screenOptions={{
                        tabBarShowLabel: false,
                        headerShown: false,

                        tabBarIndicatorStyle: {
                            backgroundColor: Colors.dark,
                            height: 2,
                            flex: 1
                        },
                    }}>
                    <Tab.Screen
                        name="ProfilePost"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/images/icons/menu-grid-outline.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} />
                                </View>
                            )
                        }}
                        component={ProfilePost} />

                    <Tab.Screen
                        name="ProfilePostLikes"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/images/icons/round-favorite.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} />
                                </View>
                            )
                        }}
                        component={ProfilePostLikes} />


                    <Tab.Screen
                        name="ProfilePostYouReacted"
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Image source={require('../../assets/images/icons/list-svgrepo-com.png')} resizeMode='contain' style={{ height: 20, width: 20, marginBottom: 3, tintColor: focused ? Colors.dark : Colors.darkLight }} />
                                </View>
                            )
                        }}
                        component={ProfilePostYouReacted} />


                </Tab.Navigator>






            </SafeAreaView >
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: { padding: 20 },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 10, paddingHorizontal: 20, margin: 10, borderRadius: 20, zIndex: 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.white, textAlign: 'center', fontWeight: '700' },
})