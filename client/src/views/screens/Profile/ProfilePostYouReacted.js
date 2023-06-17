import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../constants/Colors'

import ProfileSinglePost from './ProfileSinglePost'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'

const ProfilePostYouReacted = ({ posts }) => {

    const { loading, user, authToken } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ backgroundColor: Colors.white }}>

                <ScrollView>
                    {
                        authToken && authToken === user?._id ? (
                            posts?.length > 0 ? (
                                <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                    {
                                        posts?.map((post, index) => (
                                            <ProfileSinglePost key={index} post={post} navigate={"ProfileReactedPostTimeline"} />
                                        ))
                                    }
                                </View>
                            ) : (
                                <View style={{ padding: 30 }}>
                                    <Text style={{ color: "#000", textAlign: "center" }}>User has not react on anything yet</Text>
                                </View>
                            )
                        ) : (
                            user?.reaction_visibility === "Only Me" ? (

                                <View style={{ padding: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>

                                    <Image resizeMode='contain' style={{ width: 30, height: 30, marginBottom: 10 }} source={require("../../../assets/images/icons/lock-notallowed.png")} />
                                    <Text style={{ color: "#7B7B7B", textAlign: "center" }}>Reacted content of this user is private. - For reaction content...</Text>
                                </View>


                            ) : (

                                posts?.length > 0 ? (
                                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                        {
                                            posts?.map((post, index) => (
                                                <ProfileSinglePost key={index} post={post} navigate={"ProfileReactedPostTimeline"} />
                                            ))
                                        }
                                    </View>
                                ) : (
                                    <View style={{ padding: 30 }}>
                                        <Text style={{ color: "#000", textAlign: "center" }}>User has not react on anything yet</Text>
                                    </View>
                                )

                            )
                        )

                    }
                </ScrollView>

            </SafeAreaView>
    )
}

export default ProfilePostYouReacted

