import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { IconAntDesign, IconIonicons } from '../../components/Icons';
import { DeleteCommentAction, LikeCommentAction, UnLikeCommentAction } from '../../../redux/actions/ReactionAction';
import { useDispatch, useSelector } from 'react-redux';
import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import { useEffect } from 'react';
import moment from 'moment';
import { DELETE_COMMENT_RESET, LIKE_COMMENT_RESET, UNLIKE_COMMENT_RESET } from '../../../redux/constants/ReactionConstant';
const SingleComment = ({ post, comment }) => {

    const dispatch = useDispatch();
    const { loading, user, authToken } = useSelector((state) => state.user);
    // console.log(user?._id)
    const { message, updatedComments } = useSelector((state) => state.reaction);


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

    const [comments, setComments] = useState(post?.comments);
    
    useEffect(() => {

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
        }

    }, [dispatch, message])


    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;


    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // console.log(isModalVisible)

    return (
        loading ? <Text>Loading...</Text> :
            <View key={comment?._id} style={styles.userCommentContainer}>
                {/* <Modal
                    backdropColor='red'
                    isVisible={isModalVisible}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    animationType={"slide"}
                    coverScreen={false}
                    onDismiss={toggleModal}
                    transparent={true}>

                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{
                            width: 300,
                            height: 140,
                            backgroundColor: Colors.lightGray,
                            borderRadius: 20
                        }}>


                            <TouchableOpacity onPress={toggleModal} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} >
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
                                    <TouchableOpacity style={[styles.modelList, { borderBottomColor: 'transparent' }]} onPress={() => DeleteCommentFunction(comment?._id)}>
                                        <View style={styles.modelInside}>
                                            <IconIonicons name='trash-outline' size={23} color={"#FF375F"} style={{ marginRight: 10 }} />
                                            <Text style={styles.modelTitle}>Delete Comment</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : ""
                            }




                        </View>
                    </View>

                </Modal> */}

                <TouchableOpacity onLongPress={() => alert('Woking')} style={{ flexDirection: "row" }}>
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
                    {/* {
                                                post?.user._id === user?._id || user?._id === authToken ? (
                                                    <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingRight: 10 }} onPress={() => DeleteCommentFunction(comment?._id)}>
                                                        <IconAntDesign name={'delete'} size={16} color={Colors.dark} />
                                                    </TouchableOpacity>
                                                ) : ""
                                            } */}

                    {
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
                    }



                </View>
            </View>
    )
}

export default SingleComment

const styles = StyleSheet.create({
    commentEmojies: { backgroundColor: "#f2f2f2", padding: 10, borderRadius: 20 },
    userImage: { width: 50, height: 50, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '500', color: Colors.dark },

    userCommentContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20, paddingBottom: 10, borderBottomWidth: 2, borderBottomColor: "#f2f2f2" },
    userComment: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.dark },
    userCommentTime: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '100', color: Colors.dark },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
})