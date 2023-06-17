import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { AllSuggessionAction, FollowAction, OpenPromptAction, UnFollowAction } from '../../../redux/actions/YelloAction'
import { useEffect } from 'react'
import Loading from '../../components/Loading'
import { FOLLOW_RESET, UNFOLLOW_RESET } from '../../../redux/constants/YelloConstant'
import { useNavigation } from '@react-navigation/native'
import { AuthUserAction } from '../../../redux/actions/AuthAction'

import { Toaster } from '../../components/Toaster'

const SuggestedList = ({ user0 }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading, user } = useSelector((state) => state.user);
    const { loading: followLoading, status, message: msg } = useSelector((state) => state.yello);

    const [follower, setFollower] = useState(false);
    const [following, setFollowing] = useState(false);


    const FollowFunction = async (follow_user_id) => {
        await dispatch(FollowAction(follow_user_id));

    }
    const UnFollowFunction = async (unfollow_user_id) => {
        await dispatch(UnFollowAction(unfollow_user_id));
    }

    useEffect(() => {
        if (status && status === 220) {
            Toaster("success", "Success", msg && msg)
            dispatch({ type: FOLLOW_RESET })

            dispatch(AuthUserAction())
            dispatch(AllSuggessionAction())
        }
        if (status && status === 230) {
            Toaster("success", "Success", msg && msg)
            dispatch({ type: UNFOLLOW_RESET })

            dispatch(AuthUserAction())
            dispatch(AllSuggessionAction())
        }

    }, [dispatch, navigation, status, msg])


    // console.log(user0._id)
    useEffect(() => {
        const getReleation = navigation.addListener('focus', async () => {
            user?.following?.map((data) => {
                if (data?.user?._id === user0._id) {
                    setFollower(true)
                } else {
                    setFollower(false)
                }
            })
            user?.followers?.map((data) => {
                console.log(data?.user?._id)
                if (data?.user?._id === user0._id) {
                    setFollowing(true)
                } else {
                    setFollowing(false)
                }
            })
        });
        return getReleation
    }, [navigation, dispatch])

    // console.log(following)

    return (
        loading || followLoading ? <Loading /> :
            <View key={user0?._id} style={[styles.userList, { marginTop: 10 }]}>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate("PublicProfile", { userId: user0?._id, authUser: user })}>
                    {
                        user0.image ? (
                            <Image style={styles.userImage} source={{ uri: user0.image }} />
                        ) : (
                            <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                        )
                    }
                    <View style={styles.notificationMainTitles}>
                        <Text style={styles.userTitle}>{user0.first_name} {user0.last_name}</Text>
                        <Text style={styles.userName}>{user0.username}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.contentRight}>
                    {
                        follower || following ? (
                            <TouchableOpacity style={styles.buttonWarning} onPress={() => UnFollowFunction(user0?._id)}>
                                <Text style={styles.buttonWarningText}>Unfollow</Text>
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity style={styles.buttonLight} onPress={() => FollowFunction(user0?._id)}>
                                <Text style={styles.buttonLightText}>Follow</Text>
                            </TouchableOpacity>
                        )
                    }

                </View>

            </View>
    )
}

export default SuggestedList


const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    userList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: '#D9D9D9' },
    userImage: { width: 36, height: 36, borderRadius: 50 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    userTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    userName: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3, fontWeight: '700' },
    contentRight: { flex: 1, alignItems: 'flex-end', },

    buttonLight: { backgroundColor: '#E7E7E7', paddingHorizontal: 20, paddingVertical: 7, borderRadius: 20 },
    buttonLightText: { fontFamily: Fonts.primary, fontSize: 14, color: '#FF375F', fontWeight: '700' },

    buttonWarning: { backgroundColor: '#FFB300', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20 },
    buttonWarningText: { fontFamily: Fonts.primary, fontSize: 14, color: '#000080', fontWeight: '700' },
})