import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useDispatch, useSelector } from 'react-redux';
import { CloseSheetAction } from '../../redux/actions/ReactionAction';
import Comment from '../screens/Post/Comment';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { useNavigation } from '@react-navigation/native';


const CommentSheet = () => {


    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { open, post, modelType, isReact } = useSelector((state) => state.commentModel);
    // console.log(isReact)




    // console.log(modelType)
    const snapPoints = useMemo(() => ["25%", modelType && modelType === 1 ? "30%" : "70%"], []);
    const bootmSheerRef = useRef(null);
    useEffect(() => {
        if (open && bootmSheerRef.current) {
            bootmSheerRef.current.expand();
        }
    }, [open])



    useEffect(() => {

        const backAction = async () => {
            await dispatch(CloseSheetAction());
            bootmSheerRef.current.close();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    

    const renderContent = () => {
        switch (modelType) {
            case 0:
                return (
                    <View style={{ flex: 1, margin: 20 }}>
                        <Comment post={post} onCloseFunction={onCloseFunction} />
                    </View>
                )
            case 1:
                return (
                    <View style={{ padding: 20 }}>
                        {/* <Button title="Close" onPress={onCloseFunction} /> */}
                        <Text style={styles.postTitle}>{post?.caption}</Text>
                        {
                            post?.hashtag && (
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Search", {
                                        HashTag: post?.hashtag
                                    });
                                    onCloseFunction()
                                }}>
                                    <Text style={styles.postTitle}>#{post?.hashtag}</Text>
                                </TouchableOpacity>
                            )
                        }
                        <TouchableOpacity onPress={onCloseFunction} >
                            <Text style={styles.readMore}>Read Less</Text>
                        </TouchableOpacity>
                    </View>
                )
            default:
                return (<></>)
        }

    }

    const onCloseFunction = async () => {
        await dispatch(CloseSheetAction());
        bootmSheerRef.current.close();
    }
    return (
        <BottomSheet
            ref={bootmSheerRef}
            snapPoints={snapPoints}
            index={-1}
            handleHeight={40}
            enablePanDownToClose>
            {renderContent}
        </BottomSheet>
    )
}

export default CommentSheet

const styles = StyleSheet.create({
    commentItemContainer: { flex: 1, padding: 10, backgroundColor: "#eee" },
    postTitle: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '600', color: Colors.dark, },
    readMore: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '500', color: Colors.dark, marginTop: 5 },
});