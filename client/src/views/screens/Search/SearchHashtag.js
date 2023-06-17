import { View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import { IconAntDesign } from '../../components/Icons'
import Fonts from '../../../constants/Fonts'
import { SVGSearchShare } from '../../components/Svgs'
import { SearchTimelineAction } from '../../../redux/actions/SearchAction'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const SearchHashtag = ({ posts, start, text }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    let totalViews = 0;
    posts && posts.forEach((post) => {
        totalViews += post.views.length;
    })

    const Box = ({ post }) => {
        return (
            <View key={post?.id} style={styles.box}>
                <TouchableOpacity style={styles.boxInner} onPress={() => {
                    dispatch(SearchTimelineAction(posts))
                    navigation.navigate('SearchTimeline')

                }}>
                    <Image style={{ width: "100%", borderRadius: 10, height: 120 }} source={{ uri: post.images[0] ? post.images[0].image : "" }} />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            {
                start === false ?
                    (


                        posts?.length > 0 ? (
                            <ScrollView>


                                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20, marginTop: 20, borderBottomColor: "#C6C6C6", borderBottomWidth: 2, padding: 10, }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <View style={{ paddingVertical: 20, paddingHorizontal: 30, backgroundColor: "#D9D9D9" }}>
                                            <Text style={[styles.text, { fontSize: 20 }]}>#</Text>
                                        </View>
                                        <View style={{ padding: 10 }}>
                                            <Text style={[styles.text, { fontSize: 16, fontWeight: "700" }]}>#{text}</Text>
                                            <Text style={[styles.text, { fontSize: 12, color: "gray" }]}>{totalViews} Views</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <TouchableOpacity style={{ borderWidth: 2, borderColor: "#D8D8D8", padding: 15, borderRadius: 15 }}>
                                            <SVGSearchShare />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.boxContainer}>
                                    {
                                        posts?.map((post) => (
                                            <Box key={post._id} post={post} />

                                        ))
                                    }

                                </View>

                                {/* <View style={{ alignItems: "center", justifyContent: "center", padding: 10 }}>
                                    <TouchableOpacity>
                                        <Text style={[styles.text, { color: "#000080", fontWeight: '700', fontSize: 14 }]}>View More</Text>
                                    </TouchableOpacity>
                                </View> */}

                            </ScrollView>
                        ) : (
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 40 }}>No result found...</Text>
                            </View>
                        )

                    ) : (
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 30 }}>Search Hashtag...</Text>
                        </View>
                    )
            }
        </SafeAreaView>
    )
}

export default SearchHashtag



const styles = StyleSheet.create({
    text: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark, textAlign: 'justify' },
    userImage: { width: 30, height: 30, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '700', color: Colors.dark },
    username: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark },

    constiner: { flex: 1, },
    header: { width: "100%", height: 80, backgroundColor: "#f2f2f2", alignItems: "center", justifyContent: "center" },
    boxContainer: { width: "100%", padding: 5, flexDirection: "row", flexWrap: "wrap" },
    box: { width: '33.3%', padding: 5, elevation: 10 },
    boxInner: { flex: 1, elevation: 5 },
})

