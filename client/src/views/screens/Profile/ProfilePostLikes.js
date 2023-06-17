import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import ProfileSinglePost from './ProfileSinglePost'

const ProfilePostLikes = ({ posts }) => {


    return (
        <SafeAreaView style={{ backgroundColor: Colors.white }}>
            <ScrollView>
                {
                    posts?.length > 0 ? (
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            {
                                posts?.map((post, index) => (
                                    <ProfileSinglePost key={index} post={post} navigate={"ProfileInActivePostTimeline"} />
                                ))
                            }
                        </View>
                    ) : (
                        <View style={{ padding: 30 }}>
                            <Text style={{ color: "#000", textAlign: "center" }}>You don't have InActive posts yet.</Text>
                        </View>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default ProfilePostLikes

