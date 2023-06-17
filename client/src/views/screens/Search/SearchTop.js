import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { IconAntDesign } from '../../components/Icons'
import Fonts from '../../../constants/Fonts'
import { useDispatch } from 'react-redux'
import { SearchTimelineAction } from '../../../redux/actions/SearchAction'
import { useNavigation } from '@react-navigation/native'

const SearchTop = ({ posts }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const Box = ({ post }) => {
        return (
            <View key={post?._id} style={styles.box}>
                <View style={styles.boxInner}>
                    <TouchableOpacity onPress={() => {
                        dispatch(SearchTimelineAction(posts))
                        navigation.navigate('SearchTimeline')

                    }}>
                        <Image style={{ width: "100%", borderRadius: 10, height: 170 }} source={{ uri: post.images[0] ? post.images[0].image : "" }} />
                    </TouchableOpacity>
                    <Text style={styles.descText}>{post?.caption.length > 27 ? post?.caption.substring(0, 27) + "..." : post?.caption}</Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                        <View style={{ alignItems: "center" }}>
                            {
                                post?.user.image ? (
                                    <Image style={styles.userImage} source={{ uri: post?.user.image }} />
                                ) : (
                                    <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                )
                            }
                        </View>
                        <View>
                            <Text style={styles.userName}>{post?.user.first_name} {post?.user.last_name}</Text>
                            <Text style={styles.username}>{post?.user.username}</Text>
                        </View>
                        <View />
                        <View />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            {
                                post?.numbersOfLikes > 0 ? (
                                    <>
                                        <IconAntDesign name={'heart'} color='#FF2727' size={15} />
                                        <Text style={styles.userName}> {post?.numbersOfLikes}</Text>
                                    </>
                                ) : (
                                    <>
                                        <IconAntDesign name={'heart'} color='#fff' size={15} />
                                        <Text style={[styles.userName, { color: "#fff" }]}> 0</Text>

                                    </>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView>
                <View style={styles.boxContainer}>
                    {
                        posts?.map((post) => (
                            <Box key={post._id} post={post} />
                        ))
                    }
                    {
                        posts && posts.length === 0 && (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 30 }}>No result found...</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchTop



const styles = StyleSheet.create({
    descText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark, textAlign: 'justify' },
    userImage: { width: 30, height: 30, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '700', color: Colors.dark },
    username: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark },

    constiner: { flex: 1, },
    header: { width: "100%", height: 80, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center" },
    boxContainer: { width: "100%", padding: 10, flexDirection: "row", flexWrap: "wrap" },
    box: { width: '50%', padding: 10, elevation: 10 },
    boxInner: { flex: 1, elevation: 5 },
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
})