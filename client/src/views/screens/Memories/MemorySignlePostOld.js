import { Dimensions, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import { SinglePostAction } from '../../../redux/actions/PostAction'
import Loading from '../../components/Loading'
import { IconAntDesign } from '../../components/Icons'
import { PrimaryButton } from '../../components/Button'
import { OpenSheetAction } from '../../../redux/actions/ReactionAction'
import { MemoryRepostAction } from '../../../redux/actions/MemoriesAction'
import { MEMORY_REPOST_RESET } from '../../../redux/constants/MemoriesConstant'

const MemorySignlePost = ({ route, navigation }) => {

    const dispatch = useDispatch();
    const { postId } = route.params;
    const { loading, post } = useSelector((state) => state.post);
    const { loading: memoryLoading, message, status } = useSelector((state) => state.memories)

    useEffect(() => {
        const getPost = navigation.addListener('focus', async () => {
            await dispatch(SinglePostAction(postId));
        });
        return getPost;
    }, [dispatch, navigation, postId])

    useEffect(() => {
        if (status && status === 422) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: MEMORY_REPOST_RESET })
        }

        if (status && status === 2001) {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: MEMORY_REPOST_RESET });
            navigation.goBack();
        }
    }, [dispatch, message, navigation])

    return (
        loading || memoryLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />



                <ScrollView>
                    <View style={[styles.headerContainer, { paddingBottom: 10 }]}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Memory Details</Text>
                            </View>
                        </View>








                    </View>


                    <View style={styles.container}>
                        <Image style={{ width: "100%", borderRadius: 8, height: Dimensions.get("window").height - 300 }} source={{ uri: post?.image?.url }} />

                        <View>
                            <Text style={styles.postTitle}>{post?.caption.length > 40 ? post?.caption.substring(0, 40) + "..." : post?.caption}</Text>
                            <TouchableOpacity onPress={() => dispatch(OpenSheetAction(true, post, 1))} >
                                <Text style={styles.readMore}>Read More</Text>
                            </TouchableOpacity>
                        </View>

                        <PrimaryButton title='Post Again' margintop={20} onPress={() => dispatch(MemoryRepostAction(post?._id))} />
                    </View>



                </ScrollView>
            </SafeAreaView >
    )
}

export default MemorySignlePost

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    postTitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '600', color: Colors.dark, marginTop: 10, paddingRight: 30 },
    readMore: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '500', color: Colors.dark, marginTop: 5 },

})