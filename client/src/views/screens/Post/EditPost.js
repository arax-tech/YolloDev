import { Dimensions, Image, PermissionsAndroid, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

import { PrimaryButton } from '../../components/Button'
import { IconAntDesign, IconEntypo } from '../../components/Icons'
import { Dropdown } from 'react-native-element-dropdown'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { SinglePostAction, UpdatePostAction } from '../../../redux/actions/PostAction'
import { CREATE_POST_RESET, UPDATE_POST_RESET } from '../../../redux/constants/PostConstant'

import { Dialog } from 'react-native-paper';

import ImgToBase64 from 'react-native-image-base64';


import PhotoEditor from "@baronha/react-native-photo-editor";
import { AuthUserAction } from '../../../redux/actions/AuthAction'




const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const EditPost = ({ route, navigation }) => {

    const { post_id, post } = route.params;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2000)
    }, [])
    const { message, IsUpdated } = useSelector((state) => state.post);


    useEffect(() => {
        async function setData() {
            setCaption(post?.caption)
            setHashtag(post?.hashtag)
            setVisibility(post?.who_can_see)
            setComment(post?.allow_comments)
            setQuality(post?.allow_high_quality)
            setReaction(post?.allow_reactions)

            if (post?.images[0] && post?.images[0]) {
                const base64String1 = await ImgToBase64.getBase64String(post?.images[0]?.image);
                setImage1(`data:image/jpeg;base64,${base64String1}`);
                setImage1Preview(post?.images[0]?.image);
            }
            if (post?.images[1] && post?.images[1]) {
                const base64String2 = await ImgToBase64.getBase64String(post?.images[1]?.image);
                setImage2(`data:image/jpeg;base64,${base64String2}`);
                setImage2Preview(post?.images[1]?.image);
            }
            if (post?.images[2] && post?.images[2]) {
                const base64String3 = await ImgToBase64.getBase64String(post?.images[2]?.image);
                setImage3(`data:image/jpeg;base64,${base64String3}`);
                setImage3Preview(post?.images[2]?.image);
            }
        }

        setData()
    }, [])


    const [visibility, setVisibility] = useState();

    const [caption, setCaption] = useState('');
    const [hashtag, setHashtag] = useState('');

    const [comment, setComment] = useState(true);
    const [reaction, setReaction] = useState(true);
    const [quality, setQuality] = useState(false);

    const visibilityArrray = [
        { label: 'Everyone', value: 'Everyone' },
        { label: 'Followers', value: 'Followers' },
        { label: 'Only Me', value: 'Only Me' },
    ]



    const ref = useRef(null);



    const [image1, setImage1] = useState(null);
    const [image1Preview, setImage1Preview] = useState(null);

    const [image2, setImage2] = useState(null);
    const [image2Preview, setImage2Preview] = useState(null);

    const [image3, setImage3] = useState(null);
    const [image3Preview, setImage3Preview] = useState(null);


    const [model, setModel] = useState(false);



    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };


    const showPhotoEditor = async (image) => {
        try {
            const Options = {
                path: image,
            }
            const result = await PhotoEditor.open(Options);
            if (result !== null) {
                if (image1 === null) {
                    const base64String1 = await ImgToBase64.getBase64String(result);
                    setImage1(`data:image/jpeg;base64,${base64String1}`);
                    setImage1Preview(result);
                } else if (image2 === null) {
                    const base64String2 = await ImgToBase64.getBase64String(result);
                    setImage2(`data:image/jpeg;base64,${base64String2}`);
                    setImage2Preview(result);
                } else if (image3 === null) {
                    const base64String3 = await ImgToBase64.getBase64String(result);
                    setImage3(`data:image/jpeg;base64,${base64String3}`);
                    setImage3Preview(result);
                }
            } else {
                return;
            }

        } catch (error) {
            console.log(error);
        }
    }

    const captureImage = async (type) => {
        let options = { mediaType: type };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                setModel(false);
                if (response.didCancel) {
                    console.log('User cancelled camera picker');
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    console.log('Camera not available on device');
                    return;
                } else if (response.errorCode == 'permission') {
                    console.log('Permission not satisfied');
                    return;
                } else if (response.errorCode == 'others') {
                    console.log(response.errorMessage);
                    return;
                }
                showPhotoEditor(response.assets[0].uri);

            });
        }
    };

    const chooseFile = (type) => {
        let options = { mediaType: type };
        launchImageLibrary(options, (response) => {
            setModel(false);
            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            showPhotoEditor(response.assets[0].uri);
        });
    };

    let images = [];
    image1 !== null && images.push(image1);
    image2 !== null && images.push(image2);
    image3 !== null && images.push(image3);

    // console.log(image1 && image1.length)

    const UpdatePost = async () => {
        if (image1 && image1 === null) {
            ToastAndroid.show('Image is required...', ToastAndroid.SHORT);
        } else if (caption === null) {
            ToastAndroid.show('Caption is required...', ToastAndroid.SHORT);
        } else {
            await dispatch(UpdatePostAction(caption, hashtag, images, visibility, comment, reaction, quality, post_id));
        }
    }

    useEffect(() => {
        if (IsUpdated && IsUpdated === true) {
            dispatch({ type: UPDATE_POST_RESET });
            setCaption('');
            
            setImage1(null)
            setImage1Preview(null)

            setImage2(null)
            setImage2Preview(null)

            setImage3(null)
            setImage3Preview(null)
            dispatch(AuthUserAction());
            navigation.navigate('Profile')
        }

    }, [dispatch, navigation, IsUpdated, message])


    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                <ScrollView>
                    <View style={styles.postHeaderContainer}>

                        <TouchableOpacity style={styles.postBackButton} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                        </TouchableOpacity>
                        <Text style={styles.postTitle}>Edit Post</Text>

                    </View>


                    <View style={styles.postContainer}>
                        <Text style={styles.postSubTitle}>Photos</Text>
                        <View style={styles.postPhotoList}>
                            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 0, marginTop: 20, }}>
                                {
                                    image1Preview && (
                                        <>
                                            <Image style={{ width: 67, height: 67, marginBottom: 10, borderRadius: 10 }} resizeMode='contain' source={{ uri: image1Preview }} />


                                            <TouchableOpacity onPress={() => {
                                                setImage1Preview(null)
                                                setImage1(null)
                                            }}>
                                                <IconAntDesign name='closecircle' size={18} color='#6C63FF' style={{ marginLeft: -11, marginTop: -10 }} />
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                                {
                                    image2Preview && (
                                        <>
                                            <Image style={{ width: 67, height: 67, marginBottom: 10, borderRadius: 10 }} resizeMode='contain' source={{ uri: image2Preview }} />


                                            <TouchableOpacity onPress={() => {
                                                setImage2Preview(null)
                                                setImage2(null)
                                            }}>
                                                <IconAntDesign name='closecircle' size={18} color='#6C63FF' style={{ marginLeft: -11, marginTop: -10 }} />
                                            </TouchableOpacity>
                                        </>
                                    )
                                }
                                {
                                    image3Preview && (
                                        <>
                                            <Image style={{ width: 67, height: 67, marginBottom: 10, borderRadius: 10 }} resizeMode='contain' source={{ uri: image3Preview }} />


                                            <TouchableOpacity onPress={() => {
                                                setImage3Preview(null)
                                                setImage3(null)
                                            }}>
                                                <IconAntDesign name='closecircle' size={18} color='#6C63FF' style={{ marginLeft: -11, marginTop: -10 }} />
                                            </TouchableOpacity>
                                        </>
                                    )
                                }

                                {
                                    image1 === null || image2 === null || image3 === null ? (

                                        <TouchableOpacity onPress={() => setModel(true)}>
                                            <Image style={{ width: 65 }} resizeMode='contain' source={require('../../../assets/images/2.png')} />
                                        </TouchableOpacity>
                                    ) : ""
                                }




                            </View>
                        </View>


                        <Text style={[styles.postSubTitle, { marginVertical: 10 }]}>Add Caption</Text>


                        <TextInput style={{ backgroundColor: "#F1F1F1", padding: 10, textAlignVertical: "top" }} ref={ref} multiline={true} numberOfLines={5} placeholder="Caption" value={caption} onChangeText={setCaption} />
                        <View style={{ borderWidth: 1, borderColor: "#F1F1F1", padding: 5, flex: 1, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end" }}>
                            <TextInput style={{ backgroundColor: "#F1F1F1", padding: 10, width: "100%" }} placeholder="#Hashtag" value={hashtag} onChangeText={setHashtag} />

                            {/* <TouchableOpacity onPress={handleHashTagClick}>
                                <Text style={{ borderWidth: 1, borderColor: "#F1F1F1", marginRight: 10, padding: 2, color: Colors.dark }}># Hashtags</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleMentionClick}>
                                <Text style={{ borderWidth: 1, borderColor: "#F1F1F1", padding: 2, color: Colors.dark }}>@ Mentions</Text>
                            </TouchableOpacity> */}
                        </View>









                        <TouchableOpacity style={[styles.settingList, { marginTop: 20, padding: 7 }]} onPress={() => navigation.navigate('Account')}>
                            <IconAntDesign name='lock' size={20} color={Colors.primary} style={{ marginLeft: 3 }} />
                            <Text style={styles.settingListTitle}>Who Can See This Post </Text>
                            <View style={styles.contentRight}>
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.selectedTextStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    itemContainerStyle={styles.itemContainerStyle}
                                    itemTextStyle={styles.itemTextStyle}
                                    data={visibilityArrray}
                                    maxHeight={300}
                                    labelField="label"
                                    search={false}
                                    placeholder="Everyone"
                                    valueField="value"
                                    value={visibility}
                                    onChange={item => { setVisibility(item.value) }}
                                />

                            </View>
                        </TouchableOpacity>



                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setComment(!comment)}>
                            <IconAntDesign name='message1' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow Comments </Text>
                            <View style={styles.contentRight}>
                                {
                                    comment === true ? <Image source={require('../../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setReaction(!reaction)}>
                            <IconAntDesign name='hearto' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow Reaction </Text>
                            <View style={styles.contentRight}>
                                {
                                    reaction === true ? <Image source={require('../../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.settingList, { marginTop: 3 }]} onPress={() => setQuality(!quality)}>
                            <IconEntypo name='image' size={20} color={Colors.primary} />
                            <Text style={styles.settingListTitle}>Allow High Quality Upload </Text>
                            <View style={styles.contentRight}>
                                {
                                    quality === true ? <Image source={require('../../../assets/images/icons/settings/radio-checked.png')} /> : <Image source={require('../../../assets/images/icons/settings/radio-unchecked.png')} />
                                }
                            </View>
                        </TouchableOpacity>



                        <PrimaryButton title='Update Post' margintop={50} marginbottom={50} onPress={UpdatePost} />


                    </View>


                </ScrollView>
                <Dialog visible={model} style={{ backgroundColor: "#fff" }} onDismiss={() => setModel(false)}>
                    <Dialog.Content>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.dark }}>Choose...</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModel(false)}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 0 }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.chooseType} onPress={() => chooseFile('photo')}>
                            <Text style={styles.chooseTypeText}>From Gallery</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.chooseType} onPress={() => captureImage('photo')}>
                            <Text style={styles.chooseTypeText}>From Camera </Text>
                        </TouchableOpacity>

                    </Dialog.Content>

                </Dialog>
            </SafeAreaView >
    )
}

export default EditPost

const styles = StyleSheet.create({
    postContainer: { padding: 20, },
    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, padding: 20 },
    postTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', marginLeft: 80 },
    postBackButton: {},
    postSubTitle: { fontFamily: Fonts.primary, fontSize: 16, fontWeight: '700', color: Colors.dark, },
    postPhotoList: {},
    tagButton: { backgroundColor: '#F1F1F1', padding: 5, paddingHorizontal: 10, borderRadius: 5, margin: 2 },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '600', color: Colors.dark, textAlign: 'center' },

    settingList: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: Colors.white, borderBottomWidth: 2, borderColor: "#D9D9D9", },
    settingIcon: {},
    settingListTitle: { paddingLeft: 15, fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, fontWeight: '700', alignItems: 'center', justifyContent: 'center' },
    contentRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', },


    dropdown: { width: 80, },
    itemContainerStyle: { width: 100, },
    itemTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },

    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 5, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },

    chooseType: { backgroundColor: "#f2f2f2", padding: 15, marginBottom: 3, borderRadius: 20 },
    chooseTypeText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
})