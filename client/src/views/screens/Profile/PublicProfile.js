import { Image, StatusBar, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'

import Colors from '../../../constants/Colors';

import ProfileInfo from './ProfileInfo'
import ProfilePost from './ProfilePost'
import ProfilePostLikes from './ProfilePostLikes'
import ProfilePostYouReacted from './ProfilePostYouReacted'
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';


import { Dialog } from 'react-native-paper';
import { GetUserAction } from '../../../redux/actions/AuthAction';
import styles from './NewProfileStyle';
import IcomComponent from './IcomComponent';

import { IconSimpleLineIcons, IconFeather, IconAntDesign, IconEntypo, IconOcticons } from '../../components/Icons'
import PublicProfilePost from './PublicProfilePost';
import { FollowAction, OpenPromptAction, UnFollowAction } from '../../../redux/actions/YelloAction';
import { FOLLOW_RESET, UNFOLLOW_RESET } from '../../../redux/constants/YelloConstant';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;




const PublicProfile = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { userId, authUser } = route.params;

    useEffect(() => {
        const getUser = navigation.addListener('focus', async () => {
            await dispatch(GetUserAction(userId));
        });
        return getUser
    }, [navigation, dispatch])

    const [model0, setModel0] = useState(false);
    const modelHande = () => {
        setModel0(!model0);
    }

    const [model, setModel] = useState(false);

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    const { loading, user, reactions, activePosts, profilePostYouLikes, profilePostLikes } = useSelector((state) => state.user);
    const { loading: yelloLoading, status: Fstatus, message: fmessage } = useSelector((state) => state.yello);

    const [isActive, setIsActive] = useState('ProfilePostLikes')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }


    const [follower, setFollower] = useState(false);


    const FollowFunction = async (follow_user_id) => {
        await dispatch(FollowAction(follow_user_id));

    }
    const UnFollowFunction = async (unfollow_user_id) => {
        await dispatch(UnFollowAction(unfollow_user_id));
    }

    useEffect(() => {
        if (Fstatus && Fstatus === 220) {
            dispatch(OpenPromptAction(true, 'Success', fmessage && fmessage))
            dispatch({ type: FOLLOW_RESET })
            setFollower(true)
        }
        if (Fstatus && Fstatus === 230) {
            dispatch(OpenPromptAction(true, 'Success', fmessage && fmessage))
            dispatch({ type: UNFOLLOW_RESET })
            setFollower(false)
        }
    }, [dispatch, Fstatus, fmessage])



    useEffect(() => {
        authUser?.following?.map((data) => {
            if (data?.user?._id === user?._id) {
                setFollower(true)
            } else {
                setFollower(false)

            }
        })
    }, [])

    return (
        loading || yelloLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>


                <ScrollView>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


                    <View style={[styles.container, { borderBottomColor: "#dee1e3", borderBottomWidth: 1 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: -10, }}>
                            <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.navigate("Profile")}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>

                            <Image style={{ width: 30, height: 30 }} resizeMode='contain' source={require('../../../assets/logo0.png')} />
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => navigation.navigate("Notification")} style={{ marginRight: 15, marginLeft: -15 }}>
                                    <IconSimpleLineIcons name='bell' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <IconEntypo name='dots-three-vertical' size={20} color={Colors.dark} />
                                </TouchableOpacity>
                            </View>
                        </View>


                        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10, marginBottom: 5 }}>
                            <View />
                            <TouchableOpacity style={{ alignItems: "center" }}>
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
                            {
                                authUser?._id === userId ? (
                                    <TouchableOpacity style={styles.buttonInfo}>
                                        <Text style={styles.buttonInfoText}>Public View</Text>
                                    </TouchableOpacity>
                                ) : (

                                    follower ? (
                                        <TouchableOpacity style={styles.followingButton} onPress={() => UnFollowFunction(user._id)}>
                                            <Text style={styles.followingText}>Unfollow</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity style={styles.buttonInfo} onPress={() => FollowFunction(user._id)}>
                                            <Text style={styles.buttonInfoText}>Follow</Text>
                                        </TouchableOpacity>
                                    )

                                )
                            }


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


                    {isActive === "ProfilePost" && <PublicProfilePost posts={activePosts} />}

                    {isActive === "ProfilePostLikes" && <PublicProfilePost posts={profilePostLikes} />}

                    {isActive === "ProfilePostYouReacted" && <PublicProfilePost posts={profilePostYouLikes} />}

                </ScrollView>

                <Dialog visible={model0} style={{ backgroundColor: "#fff" }} onDismiss={() => modelHande()}>
                    <Dialog.Content style={{ maxHeight: deviceHeight - 150, overflow: "hidden" }}>

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
                            <View style={{ flexDirection: 'row', marginHorizontal: -24, flexWrap: 'wrap', padding: 0, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>

                                {
                                    user?.badges?.slice(6, user?.badges?.length).map((bad, index) => (
                                        <View key={index} style={styles.tagButton}>
                                            <IcomComponent type={`Icon${bad?.badge?.type}`} name={bad?.badge?.icon} size={15} color={bad.color} />
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

export default PublicProfile

