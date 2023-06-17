import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DeletePostAction, SinglePostAction } from '../../../redux/actions/PostAction';
import Colors from '../../../constants/Colors';
import { IconAntDesign, IconEntypo, IconFeather, IconFontAwesome, IconIonicons, IconSimpleLineIcons } from '../../components/Icons';
import Loading from '../../components/Loading';
import { AddDiamondPostAction, OpenSheetAction } from '../../../redux/actions/ReactionAction';
import Fonts from '../../../constants/Fonts';
import { SVGClockChecked, SVGClockCheckFinal, SVGClockCheckPrimaryFinal, SVGClockPlusFinal, SVGProfileTimePrimary, SVGProfileTimeWhite, SVGShare } from '../../components/Svgs';

import { Dropdown } from 'react-native-element-dropdown'

import Modal from "react-native-modal";
import { ADD_DIAMOND_INTO_POST_RESET } from '../../../redux/constants/ReactionConstant';


import { PrimaryButton } from '../../components/Button'
import { DELETE_POST_RESET } from '../../../redux/constants/PostConstant';
import { useNavigation } from '@react-navigation/native';
const SignlePost = ({ item }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { loading, user, diamonds } = useSelector((state) => state.user);
    const { loading: postLoading, IsDeleted, message: msg } = useSelector((state) => state.post);
    const { message, status, updatedDaimonds } = useSelector((state) => state.reaction);





    const [show, setShow] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setShow(false)
        }, 10000)

    }, [show])




    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };




    const [isRewardModalVisible, setRewardModalVisible] = useState(false);

    const toggleRewardModal = () => {
        setRewardModalVisible(!isRewardModalVisible);
    };






    const deviceWidth = Dimensions.get("window").width;
    const deviceHeight = Dimensions.get("window").height;

    const diamondArrray = [
        { label: 'Minutes', value: '1' },
        { label: 'Hours', value: '60' },
        { label: 'Days', value: '1440' },
    ]


    const [allDiamonds, setAllDiamonds] = useState(item?.user_diamonds);
    const [diamondType, setDiamondType] = useState(1);
    const [diamondtoAdd, setDiamondToAdd] = useState(null);

    const addDiamonIntoPost = async () => {
        if (diamondtoAdd === null) {
            ToastAndroid.show("Please Enter Diamonds", ToastAndroid.SHORT);
        } else {
            await dispatch(AddDiamondPostAction(item?._id, item?.user._id, Number(diamondtoAdd) * Number(diamondType)));
        }
    }




    useEffect(() => {
        if (message && message === "Diamond Added Successfully...") {
            setAllDiamonds(updatedDaimonds && updatedDaimonds);
            setDiamondToAdd(null);
            setDiamondType(1);
            dispatch({ type: ADD_DIAMOND_INTO_POST_RESET });
            setRewardModalVisible(false);
        }

        if (IsDeleted && IsDeleted === true) {
            dispatch({ type: DELETE_POST_RESET });
            ToastAndroid.show(msg, ToastAndroid.SHORT);
            navigation.navigate("Profile")
        }




    }, [dispatch, updatedDaimonds, message, IsDeleted, msg])



    const [postActive, setPostActive] = useState(0)



    function toHoursAndMinutes(time) {
        return (
            parseInt(time / 24 / 60) + " Days : " + parseInt(time / 60 % 24) + ' Hours : ' + parseInt(time % 60) + " Minutes"
        );
    }
    // console.log(toHoursAndMinutes(115)); // 👉️ 1h 55m


    const { height, width } = Dimensions.get('window');

    
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        loading || postLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <View style={[{ flex: 1, height: Dimensions.get('window').height }]}>




                    <Modal
                        backdropColor='rgba(0,0,0,0.7)'
                        isVisible={isModalVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        animationType={"slide"}
                        coverScreen={false}
                        transparent={true}>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{
                                width: 300,
                                height: 130,
                                backgroundColor: Colors.white,
                                borderRadius: 20
                            }}>


                                <TouchableOpacity onPress={toggleModal} style={{ flex: 1, alignItems: 'flex-end', padding: 15 }}>
                                    <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 3 }} />

                                </TouchableOpacity>


                                <TouchableOpacity style={[styles.modelList, { marginTop: -40 }]} onPress={() => {
                                    navigation.navigate("EditPost", {post_id: item?._id, post: item})
                                    setModalVisible()
                                }} >
                                    <View style={styles.modelInside}>
                                        <IconFeather name='edit' size={23} color={Colors.primary} style={{ marginRight: 10 }} />

                                        <Text style={styles.modelTitle}>Edit post</Text>
                                    </View>
                                </TouchableOpacity>



                                <TouchableOpacity style={[styles.modelList, { borderBottomColor: 'transparent' }]} onPress={() => dispatch(DeletePostAction(item?._id))}>
                                    <View style={styles.modelInside}>
                                        <IconIonicons name='alert-circle-outline' size={23} color={"#FF375F"} style={{ marginRight: 10 }} />
                                        <Text style={styles.modelTitle}>Delete post</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </Modal>



                    {/* Reward Model */}
                    <Modal
                        backdropColor='rgba(0,0,0,0.7)'
                        isVisible={isRewardModalVisible}
                        deviceWidth={deviceWidth}
                        deviceHeight={deviceHeight}
                        animationType={"slide"}
                        coverScreen={false}
                        transparent={true}>

                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: 300, height: 350, backgroundColor: Colors.white, padding: 20 }}>


                                <TouchableOpacity onPress={toggleRewardModal} style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Image source={require('../../../assets/images/icons/model-close.png')} resizeMode='contain' style={{ height: 15, width: 15, marginBottom: 3 }} />
                                </TouchableOpacity>



                                <Text style={styles.rewardHeadingTitle}>Select the time you want to add</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <TextInput style={styles.rewardModelInput} keyboardType={'numeric'} value={diamondtoAdd} onChangeText={setDiamondToAdd} placeholder='Enter...' />
                                    {/* <TouchableOpacity style={styles.rewardModelButton}>
                                    <Text style={styles.rewardModelButtonText}>Minutes</Text>
                                </TouchableOpacity> */}
                                    <Dropdown
                                        style={styles.dropdown}
                                        placeholderStyle={styles.selectedTextStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        itemContainerStyle={styles.itemContainerStyle}
                                        itemTextStyle={styles.itemTextStyle}
                                        data={diamondArrray}
                                        maxHeight={300}
                                        labelField="label"
                                        search={false}
                                        placeholder="Minutes"
                                        valueField="value"
                                        value={diamondType}
                                        onChange={item => { setDiamondType(item.value) }}
                                    />
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
                                    <Image source={require('../../../assets/images/reward/icon.png')} resizeMode='contain' style={{ height: 80, width: 80, marginBottom: 3 }} />
                                </View>
                                <Text style={styles.rewardHeadingTitle}>You have <Text style={{ fontWeight: '800' }}>{diamonds?.diamonds} diamonds</Text></Text>
                                <TouchableOpacity style={styles.buttonContainer} onPress={addDiamonIntoPost}>
                                    <Text style={styles.buttonText}>Increase</Text>
                                </TouchableOpacity>


                            </View>
                        </View>

                    </Modal>

                    {/* Top Bar */}
                    <View style={{ position: 'absolute', zIndex: 1000, top: 0, paddingHorizontal: 25, paddingVertical: 20, width: Dimensions.get('window').width }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.white} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate("Search", {
                                HashTag: ""
                            })}>
                                <IconAntDesign name='search1' size={23} color={Colors.white} />
                            </TouchableOpacity>
                        </View>
                    </View>





                    <View style={{ position: 'absolute', zIndex: 1, top: 10, right: 20, width: Dimensions.get('window').width }}>

                        <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end' }}>
                            <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}>
                                {
                                    item?.images.length > 1 && (
                                        item.images.map((image, index) => (
                                            <View key={index} style={{ borderBottomColor: currentIndex == index ? Colors.primary : Colors.white, borderBottomWidth: 2, width: 15, paddingVertical: 24, marginRight: 5 }}>
                                                <Text>{` `}</Text>
                                            </View>

                                        ))
                                    )
                                }
                            </View>

                        </View>
                    </View>



                    {/* Post Detail With User Info */}
                    <View style={{ position: 'absolute', zIndex: 1, bottom: 15, padding: 15 }}>



                        <View>
                            <Text style={styles.postTitle}>{item?.caption.length > 40 ? item?.caption.substring(0, 40) + "..." : item?.caption}</Text>
                            <TouchableOpacity onPress={() => dispatch(OpenSheetAction(true, item, 1))} >
                                <Text style={styles.readMore}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* Main Image */}
                    {/* <Image resizeMode="cover" style={styles.mainImage} source={{ uri: item.images[postActive].image }} /> */}
                    <View >
                        <FlatList
                            data={item?.images}
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            onScroll={e => {
                                const x = e.nativeEvent.contentOffset.x;
                                setCurrentIndex((x / width).toFixed(0));
                            }}
                            horizontal
                            renderItem={({ item, index }) => {
                                return (
                                    <View
                                        style={{
                                            flex: 1,
                                            width: width,
                                            height: height - 53,
                                        }}>
                                        <Image key={index} style={styles.mainImage} resizeMode="cover" source={{ uri: item?.image }} />
                                    </View>
                                );
                            }}
                        />
                    </View>



                    {/* Right Side Icons */}
                    <View style={styles.rightContainer}>
                        <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                            <View style={{ marginRight: -40 }}>
                                <TouchableOpacity onPress={() => setShow(true)} style={styles.rightSideItem}>
                                    <View style={{ alignItems: 'center' }}>
                                        {
                                            show === true ? (
                                                <SVGProfileTimePrimary style={{ width: 29, height: 29, marginBottom: 1, }} />

                                            ) : (

                                                <SVGProfileTimeWhite style={{ width: 29, height: 29, marginBottom: 1, }} />
                                            )
                                        }
                                        <Text style={[styles.actionText, { color: show === true ? Colors.primary : Colors.white }]}>Time</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rightSideItem}>
                                    <View style={{ alignItems: 'center' }}>
                                        <IconSimpleLineIcons name='eye' size={23} color={Colors.white} style={{ padding: 5, marginBottom: 1 }} />
                                        <Text style={styles.actionText}>{item?.views?.length}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rightSideItem}>
                                    <View style={{ alignItems: 'center' }}>
                                        <IconFontAwesome name='heart-o' size={21} color={Colors.white} style={{ padding: 5, marginBottom: 1 }} />
                                        <Text style={styles.actionText}>{item?.likes.length}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rightSideItem} onPress={() => dispatch(OpenSheetAction(true, item, 0))} >
                                    <View style={{ alignItems: 'center' }}>
                                        <IconAntDesign name='message1' size={21} color={Colors.white} style={{ padding: 5, marginBottom: 1 }} />
                                        <Text style={styles.actionText}>{item?.comments.length}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.rightSideItem} onPress={toggleRewardModal}>
                                    <View style={{ alignItems: 'center' }}>
                                        {/* <Image style={[styles.actionButton, { width: 25, marginBottom: 1 }]} resizeMode='contain' source={require('../../../assets/images/icons/clock-plus.png')} /> */}
                                        <SVGClockPlusFinal style={{ width: 29, height: 29, padding: 5, marginBottom: 1, }} />


                                        <Text style={styles.actionText}>{item?.user_diamonds}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.rightSideItem} >
                                    <View style={{ alignItems: 'center' }}>
                                        <SVGShare color={Colors.primary} style={{ width: 29, height: 29, padding: 5, marginBottom: 1 }} />
                                        <Text style={styles.actionText}>{item?.shares?.length}</Text>
                                    </View>
                                </TouchableOpacity>




                                <TouchableOpacity style={[styles.rightSideItem, { marginBottom: -10, marginTop: -10 }]} onPress={toggleModal}>
                                    <View style={{ alignItems: 'center' }}>
                                        <IconEntypo name='dots-three-horizontal' size={23} color={Colors.white} style={{ padding: 5, marginBottom: 1 }} />
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 30, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate('Add')}>
                                <IconEntypo name='camera' size={15} color={"#000080"} />
                                <Text style={styles.userName}> Create</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                    {/* Time Reming */}
                    {
                        show ? (

                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 999, top: '-60%' }}>
                                <TouchableOpacity style={{ width: "70%", height: 90, borderRadius: 5, backgroundColor: 'rgba(52, 52, 52, 0.3)', borderBottomColor: 'rgba(52, 52, 52, 0.4)', borderBottomWidth: 5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <View>
                                        <Text style={[styles.postTitle, { fontSize: 20, fontWeight: "700", marginRight: -30, marginBottom: 10 }]}>Remaning Time</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                        <Text style={{ color: Colors.white, fontFamily: Fonts.primary, fontSize: 17, fontWeight: '900' }}>{toHoursAndMinutes(item?.tranding_diamonds.toFixed(0))}</Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <Text style={[styles.postTitle, { fontSize: 16, fontWeight: "700", }]}>Minutes</Text> */}
                            </View>
                        )
                            :
                            null
                    }
                </View>
            </SafeAreaView>
    )
}

export default SignlePost


const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: Dimensions.get("window").height },
    userImage: { width: 40, height: 40, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 11, fontWeight: '700', color: "#000080" },

    followButton: { backgroundColor: Colors.white, padding: 5, borderRadius: 15, width: 75 },
    followText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.red, textAlign: 'center' },

    followingButton: { backgroundColor: Colors.primary, padding: 5, borderRadius: 15, width: 75 },
    followingText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: "#000080", textAlign: 'center' },

    rightSideItem: { height: 50, marginBottom: 10 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '600', color: Colors.white, marginTop: 10, paddingRight: 30 },
    readMore: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '500', color: Colors.white, marginTop: 5 },

    topBarHeadings: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, color: Colors.white },
    pipe: { fontFamily: Fonts.primary, fontSize: 23, padding: 3, fontWeight: '500', color: Colors.white },

    rightContainer: { alignItems: 'flex-end', justifyContent: 'flex-end', top: Dimensions.get('window').height - 480, padding: 20 },
    actionButton: { padding: 10, marginTop: 20 },
    actionText: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '700', color: Colors.white, textAlign: 'center' },


    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
    rewardHeadingTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', padding: 10 },
    rewardModelInput: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#FFE8B2', textAlign: 'center', padding: 10, width: 170 },
    rewardModelButton: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 12 },

    sheetContainer: { paddingTop: 200, },
    sheetContentContainer: { backgroundColor: "white", },
    itemContainer: { padding: 6, margin: 6, backgroundColor: "#eee", },

    dropdown: { width: 80, fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 4, paddingLeft: 10 },
    itemContainerStyle: { width: 100, },
    itemTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },


    buttonContainer: { backgroundColor: "#FF2727", padding: 15, borderRadius: 30, width: '100%', },
    buttonText: { fontFamily: Fonts.primary, color: Colors.white, textAlign: 'center', fontSize: 20 },

})