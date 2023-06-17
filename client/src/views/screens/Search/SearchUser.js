import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'
import Loading from '../../components/Loading'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import SuggestedList from '../Profile/SuggestedList'

const SearchUser = ({ users, start }) => {
    const navigation = useNavigation();

    const { loading, user: authUser } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, padding: 10, backgroundColor: Colors.white }}>
                <ScrollView>

                    {
                        start === false ?
                            users?.length > 0 ?
                                users?.map((user, index) => (
                                    // console.log(data)
                                    user?._id !== authUser?._id && (
                                        <SuggestedList key={index} user0={user} />
                                    )
                                    // <View key={user?._id} style={[styles.userList, { marginTop: 10 }]}>
                                    //     <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate("PublicProfile", { userId: user?._id, authUser: authUser })}>
                                    //         {
                                    //             user?.image ? (
                                    //                 <Image style={styles.userImage} source={{ uri: user?.image }} />
                                    //             ) : (
                                    //                 <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                    //             )
                                    //         }

                                    //         <View style={styles.notificationMainTitles}>
                                    //             <Text style={styles.userTitle}>{user?.first_name} {user?.last_name}</Text>
                                    //             <Text style={styles.userName}>{user?.username}</Text>
                                    //         </View>
                                    //     </TouchableOpacity>
                                    //     <View style={styles.contentRight}>
                                    //         {
                                    //             user._id !== authUser?._id && (
                                    //                 <TouchableOpacity style={styles.buttonLight}>
                                    //                     <Text style={styles.buttonLightText}>Follow</Text>
                                    //                 </TouchableOpacity>
                                    //             )
                                    //         }


                                    //     </View>

                                    // </View>
                                ))
                                : (
                                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                        <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 30 }}>No result found...</Text>
                                    </View>
                                )

                            : (
                                <View>
                                    <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 20 }}>Search Users...</Text>
                                </View>
                            )
                    }







                </ScrollView>


            </SafeAreaView>
    )
}

export default SearchUser

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: Colors.white },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 25, fontWeight: '700', paddingRight: 15, color: Colors.dark },
    userList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, borderBottomWidth: 1, borderColor: '#D9D9D9' },
    userImage: { width: 36, height: 36, borderRadius: 50 },
    notificationPostImage: { width: 50, height: 40 },
    notificationMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '55%' },
    userTitle: { fontFamily: Fonts.primary, fontSize: 13, color: Colors.dark, flexWrap: 'wrap', fontWeight: "700" },
    userName: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3, fontWeight: '700' },
    contentRight: { flex: 1, alignItems: 'flex-end', },

    buttonLight: { backgroundColor: '#E7E7E7', paddingHorizontal: 10, paddingVertical: 7, borderRadius: 20 },
    buttonLightText: { fontFamily: Fonts.primary, fontSize: 14, color: '#FF375F', fontWeight: '700' },

    buttonWarning: { backgroundColor: '#FFB300', paddingHorizontal: 13, paddingVertical: 7, borderRadius: 20 },
    buttonWarningText: { fontFamily: Fonts.primary, fontSize: 14, color: '#000080', fontWeight: '700' },
})
