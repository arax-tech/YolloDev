import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Colors from '../../../constants/Colors';
import { IconAntDesign, IconEntypo, IconFeather, IconOcticons, IconSimpleLineIcons } from '../../components/Icons';



import ProfileInfo from './ProfileInfo'
import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import Loading from '../../components/Loading';
import Fonts from '../../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

import { Avatar, Dialog } from 'react-native-paper';
import { AuthUserAction, GetUserAction } from '../../../redux/actions/AuthAction';
import { SVGFollow, SVGPublicView, SVGSettings } from '../../components/Svgs';



const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


const PublicProfile = ({ route, navigation }) => {
    const { userId, authUser } = route.params;
    console.log(authUser?.first_name)
    const dispatch = useDispatch();

    const [model, setModel] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const { loading, user, reactions, activePosts, profilePostYouLikes, profilePostLikes } = useSelector((state) => state.user);
    const [isActive, setIsActive] = useState('ProfilePostLikes')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }

    useEffect(() => {
        const getUser = navigation.addListener('focus', async () => {
            await dispatch(GetUserAction(userId));
        });
        return getUser
    }, [navigation, dispatch])

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} onPress={() => {
                                navigation.navigate('ProfileTabs')
                                toggleModal()
                            }} >
                                <View style={styles.modelInside}>
                                    {/* <Image source={require('../../../assets/images/icons/following.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                    <SVGFollow style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Followers</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modelList}>
                                <View style={styles.modelInside}>
                                    <SVGPublicView style={styles.modelImage} />
                                    {/* <Image source={require('../../../assets/images/icons/public-view.png')} resizeMode='contain' style={styles.modelImage} /> */}
                                    <Text style={styles.modelTitle}>Public View</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Settings')
                                toggleModal()
                            }} style={[styles.modelList, { borderBottomColor: 'transparent' }]} >
                                <View style={styles.modelInside}>
                                    {/* <IconFeather name='settings' size={20} color={Colors.dark} style={{ marginRight: 10 }} /> */}
                                    <SVGSettings style={styles.modelImage} />
                                    <Text style={styles.modelTitle}>Settings</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>



                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />








                    <View style={styles.container}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -55, marginBottom: -30 }}>
                            <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>

                            <Image style={{ width: 80 }} resizeMode='contain' source={require('../../../assets/logo.png')} />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={{ marginRight: 15, marginLeft: -15 }}>
                                    <IconSimpleLineIcons name='bell' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconEntypo name='dots-three-vertical' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{ flexDirection: 'column' }}>
                                <Text style={[styles.text, { fontSize: 25, fontWeight: 'bold' }]}>{user?.followers.length}</Text>
                                <Text style={styles.text}>Followers</Text>
                            </TouchableOpacity>
                            {
                                user?.image ? (
                                    <Image style={{ width: 102, height: 104, borderRadius: 7 }} resizeMode='contain' source={{ uri: user?.image.url }} />
                                ) : (
                                    <Image style={{ width: 120, height: 120, borderRadius: 7 }} resizeMode='contain' source={require('../../../assets/images/profile-placeholder.png')} />
                                )
                            }
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[styles.text, { fontSize: 25, fontWeight: 'bold' }]}>{reactions?.length}</Text>
                                <Text style={styles.text}>Reactions</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '900', marginTop: 10 }]}>{user?.first_name} {user?.last_name}</Text>
                            <Text style={[styles.text, { fontSize: 16, fontWeight: '600' }]}>{user?.username}</Text>
                            {
                                authUser?._id === userId ? (
                                    <TouchableOpacity style={styles.buttonInfo}>
                                        <Text style={styles.buttonInfoText}>Public View</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.buttonInfo}>
                                        <Text style={styles.buttonInfoText}>Follow</Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>



                    </View>



                    <ProfileInfo />
                    <View style={styles.tabContainer}>
                        <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 0 }}>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePost" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePost")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconFeather name='grid' color={isActive === "ProfilePost" ? Colors.dark : Colors.darkLight} size={20} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePostLikes" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePostLikes")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconFeather name='heart' color={isActive === "ProfilePostLikes" ? Colors.dark : Colors.darkLight} size={20} />

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabBtn, isActive === "ProfilePostYouReacted" && styles.tabBtnActive]} onPress={() => setStatusFilter("ProfilePostYouReacted")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <IconOcticons name='checklist' color={isActive === "ProfilePostYouReacted" ? Colors.dark : Colors.darkLight} size={20} />
                                </View>
                            </TouchableOpacity>


                        </View>
                    </View>


                    {isActive === "ProfilePost" && <ProfilePost posts={activePosts} />}

                    {isActive === "ProfilePostLikes" && <ProfilePostLikes posts={profilePostLikes} />}

                    {isActive === "ProfilePostYouReacted" && <ProfilePostYouReacted posts={profilePostYouLikes} />}


                </ScrollView>
            </SafeAreaView >
    )
}

export default PublicProfile

const styles = StyleSheet.create({
    container: { padding: 20 },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 10, paddingHorizontal: 20, margin: 10, borderRadius: 20, zIndex: 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.white, textAlign: 'center', fontWeight: '700' },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center" },
    tabBtn: { width: deviceWidth / 3, flexDirection: 'row', padding: 15, justifyContent: 'center' },
    tabBtnActive: { borderBottomWidth: 2, borderColor: "#262626" }
})