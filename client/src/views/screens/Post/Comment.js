import { Dimensions, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { IconAntDesign, IconFeather, IconIonicons } from '../../components/Icons'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import { CloseSheetAction, CreateCommentAction, DeleteCommentAction, LikeCommentAction, UnLikeCommentAction } from '../../../redux/actions/ReactionAction'
import { CREATE_COMMENT_RESET, DELETE_COMMENT_RESET, LIKE_COMMENT_RESET, UNLIKE_COMMENT_RESET } from '../../../redux/constants/ReactionConstant'
import Loading from '../../components/Loading'

import moment from 'moment';
import { Dialog } from 'react-native-paper'

import { useNavigation } from '@react-navigation/native';

const Comment = ({ onCloseFunction, post }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, user, authToken } = useSelector((state) => state.user);
    // console.log(user?._id)
    const { message, updatedComments } = useSelector((state) => state.reaction);
    const { isReact } = useSelector((state) => state.commentModel);
    // console.log(isReact)


    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('')
    const ref = useRef(null);
    const handleEmojiesClick = (emoji) => {
        setComment(`${comment} ${emoji} `)
        ref.current.focus();
    };


    const CreateCommentFunction = async () => {
        if (comment == '') {
            ToastAndroid.show("Comment is required...", ToastAndroid.SHORT);
        } else {
            await dispatch(CreateCommentAction(post?._id, comment));
        }

    }

    const DeleteCommentFunction = async (comment_id) => {
        await dispatch(DeleteCommentAction(post?._id, comment_id));

    }

    const [liked, setLiked] = useState(false);
    const LikeCommentFunction = async (comment_id) => {
        setLiked(true)
        await dispatch(LikeCommentAction(post?._id, comment_id));
    }


    const UnLikeCommentFunction = async (comment_id) => {
        setLiked(false)
        await dispatch(UnLikeCommentAction(post?._id, comment_id));
    }





    useEffect(() => {
        if (message && message == "Comment Create Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: CREATE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }

        if (message && message == "Comment Like Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: LIKE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }

        if (message && message == "Comment UnLike Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: UNLIKE_COMMENT_RESET });
            setComment('')
            setComments(updatedComments);
        }
        if (message && message == "Comment Delete Successfully...") {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: DELETE_COMMENT_RESET });
            setComments(updatedComments);
            setModel0(false)
        }

    }, [dispatch, message])


    const scrollViewRef = useRef();

    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [deleteId, setDeleteId] = useState(null);

    const [model0, setModel0] = useState(false);
    const modelHande = () => {
        setModel0(!model0);
    }

    return (
        loading ? <Loading /> :
            <SafeAreaView>

                <ScrollView
                    ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: 10000, y: 0, animated: true })}
                    showsVerticalScrollIndicator={false} >

                    <View style={[styles.userCommentContainer, { marginTop: -5, backgroundColor: Colors.white }]}>
                        <View />

                        <View>
                            <Text style={styles.userComment}>Total - {comments?.length} </Text>
                        </View>

                        <View>
                            <TouchableOpacity onPress={onCloseFunction}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView style={{ height: 280 }} showsVerticalScrollIndicator={false}>

                        {
                            post?.allow_comments === true ? (

                                comments?.map((comment) => (
                                    <View key={comment?._id} style={styles.userCommentContainer}>

                                        <TouchableOpacity onLongPress={() => {
                                            setDeleteId(comment?._id)
                                            setModel0(true)
                                        }} style={{ flexDirection: "row" }}>
                                            <View>
                                                {
                                                    comment?.user.image ? (
                                                        <Image style={styles.userImage} source={{ uri: comment?.user.image }} />
                                                    ) : (
                                                        <Image style={styles.userImage} source={require('../../../assets/images/placeholder.jpg')} />
                                                    )
                                                }
                                            </View>

                                            <View style={{ marginLeft: 20 }}>
                                                <Text style={styles.userName}>{comment?.user.first_name} {comment?.user.last_name}</Text>
                                                <Text style={styles.userComment}>{comment?.comment}</Text>
                                                <Text style={styles.userCommentTime}>{moment(comment?.createAt).fromNow()}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>


                                            {
                                                isReact === true && (
                                                    comment.likes && comment.likes[0] === user?._id ? (

                                                        <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => UnLikeCommentFunction(comment?._id)}>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <IconAntDesign name={'heart'} size={16} color={"#FF2727"} />
                                                                {
                                                                    comment?.likes.length > 0 && (
                                                                        <Text style={styles.userComment}> {comment?.likes.length}</Text>

                                                                    )
                                                                }
                                                            </View>
                                                        </TouchableOpacity>

                                                    ) : (
                                                        <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => LikeCommentFunction(comment?._id)}>
                                                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                                <IconAntDesign name={'hearto'} size={16} color={Colors.dark} />
                                                                {/* <Text style={styles.userComment}> {comment?.likes.length}</Text> */}
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                )
                                            }



                                        </View>
                                    </View>
                                ))
                            ) : (
                                <View>

                                    <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 10 }}>Comments is off...</Text>
                                </View>
                            )
                        }




                    </ScrollView>
                    {
                        post?.allow_comments === true && (
                            <>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                    <TouchableOpacity onPress={() => handleEmojiesClick("Hello")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>Hello</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("Wow")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>Wow</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("😂")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>😂</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEmojiesClick("😍")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>😍</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("🥰")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>🥰</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("👋")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>👋</Text>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleEmojiesClick("👋")}>
                                        <View style={styles.commentEmojies}>
                                            <Text style={{ color: Colors.dark }}>👋</Text>
                                        </View>
                                    </TouchableOpacity>




                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", backgroundColor: "#464646", borderRadius: 26 }}>

                                    <TextInput onFocus={() => scrollViewRef.current.scrollTo({ x: 10000, y: 0, animated: true })} ref={ref} value={comment} onChangeText={setComment} style={{ width: '80%', borderBottomLeftRadius: 26, borderTopLeftRadius: 26, color: Colors.white, paddingLeft: 20 }} placeholder='Write your comment here....' placeholderTextColor={Colors.white} />
                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={CreateCommentFunction}>
                                        <IconFeather name={'send'} size={20} color={Colors.white} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )
                    }
                </ScrollView>

                <Dialog theme={{ colors: { backdrop: 'transparent' } }} visible={model0} style={{ backgroundColor: "#fff", borderRadius: 20 }} onDismiss={() => modelHande()}>
                    <Dialog.Content>


                        <View style={{ marginHorizontal: -24, flexWrap: 'wrap', padding: 0, alignItems: 'center', justifyContent: 'center', height: 70 }}>



                            <TouchableOpacity style={[styles.modelList, { marginTop: -10 }]} onPress={() => {
                                modelHande();
                                dispatch(CloseSheetAction());
                                onCloseFunction();
                                navigation.navigate('Report', { post_id: post?._id })

                            }}>
                                <View style={styles.modelInside}>
                                    <IconAntDesign name='exclamationcircleo' size={23} color={Colors.primary} style={{ marginRight: 10 }} />
                                    <Text style={styles.modelTitle}>Report</Text>
                                </View>
                            </TouchableOpacity>


                            {
                                post?.user._id === user?._id || user?._id === authToken ? (
                                    // <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => DeleteCommentFunction(comment?._id)}>
                                    //     <IconAntDesign name={'delete'} size={16} color={Colors.dark} />
                                    // </TouchableOpacity>
                                    <TouchableOpacity style={[styles.modelList, { borderBottomColor: 'transparent', marginBottom: -20 }]} onPress={() => DeleteCommentFunction(deleteId)}>
                                        <View style={styles.modelInside}>
                                            <IconIonicons name='trash-outline' size={23} color={"#FF375F"} style={{ marginRight: 10 }} />
                                            <Text style={styles.modelTitle}>Delete Comment</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : ""
                            }











                        </View>

                    </Dialog.Content>

                </Dialog>

            </SafeAreaView>
    )
}

export default Comment

const styles = StyleSheet.create({
    commentEmojies: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 20 },
    userImage: { width: 50, height: 50, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '500', color: Colors.dark },

    userCommentContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#f2f2f2" },
    userComment: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark },
    userCommentTime: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '100', color: Colors.dark },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 1, borderBottomColor: '#f2f2f2' },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
})