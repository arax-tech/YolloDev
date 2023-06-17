import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import Modal from "react-native-modal";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Colors from '../../../constants/Colors';


import ProfileInfo from './ProfileInfo'
import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import Loading from '../../components/Loading';
import Fonts from '../../../constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialTopTabNavigator();

import { Avatar, Dialog } from 'react-native-paper';
import { AuthUserAction } from '../../../redux/actions/AuthAction';
import { SVGFollow, SVGPublicView, SVGSettings } from '../../components/Svgs';
import styles from './NewProfileStyle';
import IcomComponent from './IcomComponent';

import { IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial } from '../../components/Icons'
import { useNavigation } from '@react-navigation/native';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;




const Profile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // useEffect(() => {
    //     const getUser = navigation.addListener('focus', async () => {
    //         await dispatch(AuthUserAction());
    //     });
    //     return getUser
    // }, [navigation, dispatch])




    const [model0, setModel0] = useState(false);
    const modelHande = () => {
        setModel0(!model0);
    }

    const [model, setModel] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const { loading, user, reactions, activePosts, isAuthenticated, profilePostYouLikes, profilePostLikes } = useSelector((state) => state.user);


   
    

    const [isActive, setIsActive] = useState('ProfilePostLikes')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }



    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
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
                            backgroundColor: Colors.white,
                            borderRadius: 20
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
                            <TouchableOpacity style={styles.modelList} onPress={() => {
                                navigation.navigate("PublicProfile", { userId: user?._id })
                                toggleModal()
                            }}>
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
                <ScrollView>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


                    <View style={[styles.container, { borderBottomColor: "#dee1e3", borderBottomWidth: 1 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -14 }}>
                            <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={require('../../../assets/logo0.png')} />
                            <View style={{ flexDirection: "row", marginRight: -10 }}>
                                <TouchableOpacity style={{ width: 30 }} onPress={() => navigation.navigate("FindFirends")}>
                                    <IconAntDesign name='adduser' size={20} color={Colors.dark} />
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: 30 }} onPress={toggleModal}>
                                    <IconEntypo name='dots-three-vertical' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, marginBottom: 5 }}>
                            <View />
                            <TouchableOpacity style={{ alignItems: "center" }} onPress={() => navigation.navigate("ProfileTabs")}>
                                <Text style={[styles.figures, { fontWeight: "900" }]}>{user?.followers.length}</Text>
                                <Text style={[styles.reactions, { color: "#939393" }]}>Followers</Text>
                            </TouchableOpacity>
                            <View />

                            {
                                user?.image ? (
                                    <Image style={styles.userImage} resizeMode="cover" source={{ uri: user?.image }} />
                                ) : (
                                    <Image style={styles.userImage} resizeMode="cover" source={require('../../../assets/images/profile-placeholder.png')} />
                                )
                            }
                            {/* <Image style={styles.userImage} resizeMode="cover"
                                source={require("./assets/rectangle-6586.png")}
                            /> */}
                            <View />
                            <View style={{ alignItems: "center" }}>
                                <Text style={[styles.k, styles.figures, { fontWeight: "900" }]}>{reactions?.length}</Text>
                                <Text style={[styles.reactions, { color: "#939393" }]}>{`Reactions `}</Text>
                            </View>
                            <View />
                        </View>
                        <Text style={styles.username}>{user?.first_name} {user?.last_name}</Text>


                        <Text style={styles.userName1}>@{user?.username}</Text>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonInfo} onPress={() => navigation.navigate('ProfileEdit')}>
                                <Text style={styles.buttonInfoText}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.description]}>{user?.bio}</Text>


                    </View>

                    {
                        user?.badges?.length > 0 && (
                            <View style={{ borderBottomColor: "#dee1e3", borderBottomWidth: 1, paddingVertical: 10, backgroundColor: Colors.white }}>
                                <ProfileInfo modelHande={modelHande} />
                            </View>
                        )
                    }


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

                <Dialog visible={model0} style={{ backgroundColor: "#fff" }} onDismiss={() => modelHande()}>
                    <Dialog.Content style={{ maxHeight: deviceHeight - 150 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, marginTop: -8 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.dark }}>More Badges...</Text>
                            </View>

                            <TouchableOpacity onPress={() => modelHande()}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 0 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: -24, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }} />
                        <ScrollView showsVerticalScrollIndicator={false}>


                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 0, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>

                                {
                                    user?.badges?.slice(6, user?.badges?.length).map((bad) => (
                                        <View key={bad?._id} style={styles.tagButton}>
                                            <IcomComponent type={`Icon${bad?.badge?.type}`} name={bad?.badge?.icon} size={15} color={bad?.badge?.color} />
                                            <Text style={styles.tagButtonText}>{bad?.badge?.name}</Text>
                                        </View>
                                    ))
                                }





                                <TouchableOpacity onPress={() => modelHande()} style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                                    <Text style={styles.tagButtonText}>Show Less</Text>
                                </TouchableOpacity>







                            </View>
                        </ScrollView>

                    </Dialog.Content>

                </Dialog>
            </SafeAreaView>
    )
}

export default Profile

