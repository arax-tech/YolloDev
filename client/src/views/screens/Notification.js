import { StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image, ToastAndroid, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'

import moment from 'moment';
import { AuthUserAction } from '../../redux/actions/AuthAction'
import { HideNotificationAction } from '../../redux/actions/YelloAction'
import { HIDE_NOTIFICATION_RESET } from '../../redux/constants/YelloConstant'
import { useState } from 'react'

const Notification = ({ navigation }) => {
    const dispatch = useDispatch();
    
    // useEffect(() => {
    //     const getUserNotification = navigation.addListener('focus', async () => {
    //         await dispatch(AuthUserAction());
    //     });
    //     return getUserNotification;
    // }, [navigation, dispatch]); 
    
    const { loading, notifications } = useSelector((state) => state.user);
    const { loading: notificaionLoading, message, isHide } = useSelector((state) => state.yello);

    
    // const [notifications, setNotifications] = useState(noti);
    useEffect(() => {
        if (isHide && isHide == true) {
            dispatch({ type: HIDE_NOTIFICATION_RESET });
        }
    }, [dispatch, isHide])

    // console.log(notifications)


    const HideNotification = async (id) => {
        await dispatch(HideNotificationAction(id));
        await dispatch(AuthUserAction());

        // let newNotifications = [...notifications];
        // let index = newNotifications.findIndex(notification => notification?._id === id);
        // if (newNotifications[index]?._id === id) {
        //     newNotifications.splice(index, 1);
        // }
        // setNotifications(newNotifications);
        // dispatch(HideNotificationAction(id));
    }



    return (
        loading || notificaionLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.lightGray }} forceInset={{ top: 'always' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Notifications</Text>
                </View>


                <ScrollView>

                    {
                        notifications?.length > 0 ?
                        notifications?.map((notification) => (
                            <TouchableOpacity key={notification?._id} style={styles.notificationList} onPress={() => HideNotification(notification?._id)}>


                                {
                                    notification?.user.image ? (
                                        <Image style={styles.notificationImage} source={{ uri: notification?.user.image }} />
                                    ) : (
                                        <Image style={styles.notificationImage} source={require('../../assets/images/placeholder.jpg')} />
                                    )
                                }

                                {
                                    notification?.type === "PostTimeEnding" ? (

                                        <View style={styles.notificationMainTitles}>
                                            <Text style={styles.notificationTitle}>{notification?.description.split("-|-")[0]}</Text>
                                            <Text style={[styles.notificationTime, { color: "#FF2727", fontWeight: '700', opacity: 1 }]}>Ending In {notification?.description.split("-|-")[1]} Minutes</Text>
                                        </View>
                                    ) : (
                                        <View style={styles.notificationMainTitles}>
                                            <Text style={styles.notificationTitle}><Text style={{ fontWeight: '700' }}>{notification?.user.first_name} {notification?.user.last_name}</Text> {notification?.description}</Text>
                                            <Text style={styles.notificationTime}>{moment(notification?.createdAt).fromNow()}</Text>
                                        </View>
                                    )
                                }


                                {
                                    notification?.type === "Like" && (
                                        <View style={styles.contentRight}>
                                            <TouchableOpacity style={styles.notificationButtonPrimary} >
                                                <Text style={styles.notificationButtonText}>View Post</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                                {
                                    notification?.type === "Comment" && (
                                        <View style={styles.contentRight}>
                                            <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                <Text style={styles.notificationButtonText}>View Post</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }


                                {
                                    notification?.type === "Post" && (
                                        <View style={styles.contentRight}>
                                            <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                                        </View>

                                    )
                                }


                                {
                                    notification?.type === "PostTimeEnding" && (
                                        <View style={styles.contentRight}>
                                            <TouchableOpacity style={styles.notificationButtonDanger}>
                                                <Text style={styles.notificationButtonText}>Increase Time</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }

                                {
                                    notification?.type === "GiveYouDiamond" && (
                                        <View style={styles.contentRight}>
                                            <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                <Text style={styles.notificationButtonText}>Send Time</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }

                                {
                                    notification?.type === "FollowingPost" && (
                                        <View style={styles.contentRight}>
                                            <Image style={styles.notificationPostImage} source={require('../../assets/images/notification/2.png')} />
                                        </View>
                                    )
                                }
                                {
                                    notification?.type === "FollowYou" && (
                                        <View style={styles.contentRight}>
                                            <TouchableOpacity style={styles.notificationButtonPrimary}>
                                                <Text style={styles.notificationButtonText}>Follow Back</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }





                            </TouchableOpacity>

                        )) : (
                            <View>
                                    <Text style={[styles.header, { marginTop: 3 }]}>You are up to date, no new notifications...</Text>
                            </View>
                        )
                    }



                </ScrollView>


            </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    notificationList: { flexDirection: 'row', padding: 20, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5 },
    notificationImage: { width: 36, height: 36, borderRadius: 30 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    notificationTitle: { fontFamily: Fonts.primary, fontSize: 12.6, flexWrap: 'wrap' },
    notificationTime: { fontFamily: Fonts.primary, fontSize: 11, opacity: 0.4, marginTop: 3 },
    contentRight: { flex: 1, alignItems: 'flex-end', },
    notificationButtonPrimary: { backgroundColor: Colors.notificationButton, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonDanger: { backgroundColor: Colors.notificationButtonDanger, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.white },
})