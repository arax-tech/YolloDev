import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LinearGradient from 'react-native-linear-gradient';


import Colors from '../../constants/Colors';
import CreatePost from '../screens/Post/CreatePost';

import { IconAntDesign, IconIonicons, IconSimpleLineIcons } from '../components/Icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


import Home from '../screens/Home';
import Notification from '../screens/Notification';
import Reward from '../screens/Reward';
import Profile from '../screens/Profile/Profile';
import FollowingPost from '../screens/FollowingPost';
import SearchTimeline from '../screens/Search/SearchTimeline';
import ProfileReactedPostTimeline from '../screens/Profile/ProfileReactedPostTimeline';
import FindFirends from '../screens/Profile/FindFirends';
import PublicProfile from '../screens/Profile/PublicProfile';
import ProfileEdit from '../screens/Profile/ProfileEdit';
import { useSelector } from 'react-redux';
import Loading from '../components/Loading';

const Tab = createBottomTabNavigator();


const BottomNavigation = () => {



    const { loading, notifications } = useSelector((state) => state.user);

    return (
        loading ? <Loading /> :
            <Tab.Navigator
                screenOptions={{
                    tabBarShowLabel: false,
                    headerShown: false,
                }}>



                <Tab.Screen
                    name="Home"
                    options={({ route }) => ({
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, }}>
                                <IconIonicons name='home-outline' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Home</Text>
                            </View>
                        )
                    })}
                    component={Home} />





                <Tab.Screen name="FollowingPost" options={() => ({ tabBarItemStyle: { display: "none" } })} component={FollowingPost} />
                <Tab.Screen name="FindFirends" options={() => ({ tabBarItemStyle: { display: "none" } })} component={FindFirends} />
                <Tab.Screen name="PublicProfile" options={() => ({ tabBarItemStyle: { display: "none" } })} component={PublicProfile} />
                <Tab.Screen name="ProfileEdit" options={() => ({ tabBarItemStyle: { display: "none" } })} component={ProfileEdit} />

                <Tab.Screen
                    name="ProfileReactedPostTimeline"
                    options={({ route }) => ({
                        tabBarItemStyle: { display: "none" },
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, }}>
                                <IconIonicons name='home-outline' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Home</Text>
                            </View>
                        )
                    })}
                    component={ProfileReactedPostTimeline} />

                <Tab.Screen
                    name="SearchTimeline"
                    options={({ route }) => ({
                        tabBarItemStyle: { display: "none" },
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3, }}>
                                <IconIonicons name='home-outline' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Home</Text>
                            </View>
                        )
                    })}
                    component={SearchTimeline} />






                <Tab.Screen
                    name="Notification"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                {
                                    notifications && notifications.length > 0 && (
                                        <View style={{ backgroundColor: "red", width: 6, height: 6, borderRadius: 50, marginLeft: 25 }}>
                                            <Text>0</Text>
                                        </View>
                                    )
                                }
                                <IconSimpleLineIcons name='bell' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Notification</Text>
                            </View>
                        )
                    }}
                    component={Notification} />





                <Tab.Screen
                    name="Add"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FFB32B', '#EAE17C']} style={[styles.linearGradient, { height: 60, width: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 100, elevation: 5, bottom: 23 }]} >
                                <IconAntDesign name='plus' size={25} color={'blue'} />
                            </LinearGradient>



                        )
                    }}
                    component={CreatePost} />


                <Tab.Screen
                    name="Reward"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <IconSimpleLineIcons name='diamond' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />
                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Reward</Text>
                            </View>
                        )
                    }}
                    component={Reward} />




                <Tab.Screen
                    name="Profile"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: 'center', justifyContent: 'center', top: 3 }}>
                                <IconSimpleLineIcons name='user' size={20} color={focused ? Colors.dark : Colors.darkLight} style={{ marginBottom: 3 }} />

                                <Text style={{ fontSize: 10, color: focused ? Colors.dark : Colors.darkLight, fontWeight: focused ? '600' : '500', }}>Profile</Text>
                            </View>
                        )
                    }}
                    component={Profile} />


            </Tab.Navigator>
    )
}

export default BottomNavigation





const styles = StyleSheet.create({})