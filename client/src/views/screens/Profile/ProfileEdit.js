import { Image, StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, TextInput, ScrollView, ToastAndroid, Platform, BackHandler, PermissionsAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { PrimaryButton } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { AuthUserAction, ProfileUpdateAction } from '../../../redux/actions/AuthAction'
import { CREATE_TAG_RESET, UPDATE_PROFILE_RESET } from '../../../redux/constants/AuthConstant'

import DateTimePicker from '@react-native-community/datetimepicker';

import { Dialog } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IconAntDesign } from '../../components/Icons'
import { SearchAction } from '../../../redux/actions/SearchAction'
import { OpenPromptAction } from '../../../redux/actions/YelloAction'
import IcomComponent from './IcomComponent'


import ImgToBase64 from 'react-native-image-base64';

import CountryPicker from 'react-native-country-picker-modal';

import PhotoEditor from "@baronha/react-native-photo-editor";
import { useNavigation } from '@react-navigation/native'
import { Toaster } from '../../components/Toaster'

const ProfileEdit = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();



    const { loading, user } = useSelector((state) => state.user);
    const { loading: updateLoading, message, isUpdated, isCreated, status } = useSelector((state) => state.updateProfile);
    const { loading: badgesLoading, badges } = useSelector((state) => state.search);



    useEffect(() => {

        const getBadges = navigation.addListener('focus', async () => {
            await dispatch(SearchAction());
        });
        return getBadges;
    }, [dispatch, navigation])

    const [model1, setModel1] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState('');




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
                const base64String1 = await ImgToBase64.getBase64String(result);
                console.log(result.split("/Pictures/")[1])
                setImage(`data:image/jpeg;base64,${base64String1}`);
                setFileName(result.split("/Pictures/")[1]);
                setImagePreview(result);
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
                setModel1(false);
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
                    console.log(response.errorMessage)
                    return;
                }
                showPhotoEditor(response.assets[0].uri);

            });
        }
    };

    const chooseFile = (type) => {
        let options = { mediaType: type };
        launchImageLibrary(options, (response) => {
            setModel1(false);
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

    const [birthday, setBirthDay] = useState(user?.birthday);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChangeBirthday = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();
        setBirthDay(fDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };



    const [gender, setGender] = useState(user?.gender ? user?.gender : null);





    const genderArray = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Other', value: 'Other' }
    ];


    const [data, setData] = useState({
        first_name: user?.first_name ? user?.first_name : null,
        last_name: user?.last_name ? user?.last_name : null,
        username: user?.username ? user?.username : null,
        email: user?.email ? user?.email : null,
        phone: user?.phone ? user?.phone : null,
        country: user?.country ? user?.country : null,
        city: user?.city ? user?.city : null,
        bio: user?.bio ? user?.bio : null,
    });

    const InpChnage = (text, field) => {
        setData({ ...data, [field]: text });
    }



    const handleBackButtonClick = () => {
        if (user?.new_user === true) {
            ToastAndroid.show("Please update profile first then you can go back...", ToastAndroid.SHORT);
        } else {
            navigation.goBack();
            return true;
        }
    }
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
        };
    }, []);



    const [model, setModel] = useState(false);

    const [items, setItems] = useState([]);
    const [pices, setPices] = useState([]);
    useEffect(() => {
        user?.badges.map((bad) => {
            setItems(old => [...old, { badge: bad?.badge?._id }]);
            setPices(old => [...old, bad?.badge?._id]);
        })
    }, [user])

    const BadgeFunction = async (id) => {


        // Items
        let newItems = [...items];
        let index = newItems.findIndex(item => item?.badge === id);
        if (newItems[index]?.badge === id) {
            newItems.splice(index, 1);
        } else {
            newItems[index] = { ...newItems.push({ badge: id }) };
        }
        setItems(newItems);



        // Pices
        let newPices = [...pices];
        let index1 = newPices.findIndex(pice => pice === id);
        if (newPices[index1] === id) {
            newPices.splice(index1, 1);
        } else {
            newPices[index1] = { ...newPices.push(id) };
        }
        setPices(newPices);
    }

    // console.log(items)
    // console.log(pices)
    // console.log(`Items ${items.length}`)
    // console.log(`Pices ${pices.length}`)

    const BadgeItem = ({ badge, index }) => {
        const isSelected = pices.includes(index)

        return (
            <TouchableOpacity key={badge?._id} style={isSelected ? styles.tagButtonActive : styles.tagButton} onPress={() => BadgeFunction(badge?._id)}>
                <IcomComponent type={`Icon${badge.type}`} name={badge?.icon} size={15} color={badge?.color} />
                <Text style={styles.tagButtonText}>{badge?.name}</Text>
            </TouchableOpacity>
        )
    }


    console.log()

    const UpdateProfile = async () => {
        if (data?.first_name === null || data?.first_name.length === 0) {
            Toaster("error", "Oopss !", 'First name is required...')
        } else if (data.last_name === null || data.last_name.length === 0) {
            Toaster("error", "Oopss !", 'Last name is required...');
        } else if (data.username === null || data.username.length === 0) {
            Toaster("error", "Oopss !", 'Username is required...');
        } else if (data.email === null || data.email.length === 0) {
            Toaster("error", "Oopss !", 'Email is required...');
        } else if (data.phone === null || data.phone.length === 0) {
            Toaster("error", "Oopss !", 'Phone is required...');
        } else if (data.country === null || data.country.length === 0) {
            Toaster("error", "Oopss !", 'Country is required...');
        } else if (data.city === null || data.city.length === 0) {
            Toaster("error", "Oopss !", 'City is required...');
        } else if (data.bio === null || data.bio.length === 0) {
            Toaster("error", "Oopss !", 'Bio is required...');
        } else {
            await dispatch(ProfileUpdateAction(data.first_name, data.last_name, data.username, data.email, data.phone, gender, birthday, data.country, data.city, data.bio, image, fileName, items));

        }
    }


    // console.log(status)

    useEffect(() => {
        if (status && status === 200) {
            // ToastAndroid.show(message, ToastAndroid.SHORT);
            // dispatch(OpenPromptAction(true, 'Success', message && message))
            Toaster("success", "Success", message && message)
            dispatch({ type: UPDATE_PROFILE_RESET });
            dispatch(AuthUserAction());
            navigation.navigate("Profile")

        }
        if (status && status === 500) {
            dispatch(OpenPromptAction(true, 'Opps', message && message))
            dispatch({ type: UPDATE_PROFILE_RESET });
        }
        if (isCreated && isCreated === true) {
            ToastAndroid.show(message && message, ToastAndroid.SHORT);
            dispatch({ type: CREATE_TAG_RESET });

        }
    }, [dispatch, navigation, status, isCreated, message])
    return (
        loading || badgesLoading || updateLoading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />


                <ScrollView>
                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={handleBackButtonClick}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Edit Profile</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.container}>
                        {/* <Text style={[styles.formLabel, { fontSize: 20 }]}>Set up your profile details</Text> */}
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            {
                                imagePreview !== null ? (
                                    <Image style={{ width: 130, height: 130, borderRadius: 10 }} resizeMode='contain' source={{ uri: imagePreview }} />

                                ) : (

                                    user?.image ? (
                                        <Image style={{ width: 130, height: 130, borderRadius: 10 }} resizeMode='contain' source={{ uri: user?.image }} />
                                    ) : (
                                        <Image style={{ width: 130, height: 130, }} resizeMode='contain' source={require('../../../assets/images/profile-placeholder.png')} />
                                    )


                                )
                            }

                        </View>
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => setModel1(true)}>
                                <Text style={styles.chnageProfileTxt}>Change Profile</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>First Name</Text>
                                <TextInput style={styles.formInput} value={data.first_name} onChangeText={(text) => InpChnage(text, 'first_name')} />
                            </View>
                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Last Name</Text>
                                <TextInput style={styles.formInput} value={data.last_name} onChangeText={(text) => InpChnage(text, 'last_name')} />
                            </View>
                        </View>




                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>User name</Text>
                            <TextInput style={styles.formInput} value={data.username} onChangeText={(text) => InpChnage(text, 'username')} />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Email</Text>
                            <TextInput style={styles.formInput} keyboardType='email-address' value={data.email} onChangeText={(text) => InpChnage(text, 'email')} />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Phone</Text>
                            <TextInput style={styles.formInput} value={data.phone} onChangeText={(text) => InpChnage(text, 'phone')} />
                        </View>

                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>


                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Gender</Text>


                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.selectedTextStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    data={genderArray}
                                    maxHeight={300}
                                    labelField="label"
                                    search={false}
                                    placeholder="Gender"
                                    valueField="value"
                                    value={gender}
                                    onChange={item => { setGender(item.value) }}
                                />

                            </View>

                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Birth year</Text>
                                <TouchableOpacity onPress={showDatepicker} style={styles.formInput}>
                                    <Text style={styles.dateTxt}>{birthday}</Text>
                                </TouchableOpacity>


                                {
                                    show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date}
                                            mode={mode}
                                            is24Hour={true}
                                            display="default"
                                            maximumDate={new Date(2013, 1, 1)}
                                            minimumDate={new Date(1950, 0, 1)}
                                            onChange={onChangeBirthday}
                                        />
                                    )
                                }
                            </View>
                        </View>



                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Country</Text>
                                <CountryPicker
                                    theme={{ fontSize: 14 }}
                                    containerButtonStyle={[styles.formInput, { padding: 15, fontSize: 10 }]}
                                    withFilter
                                    withEmoji
                                    onSelect={(country) => InpChnage(country?.name, 'country')}
                                    value={data.country}
                                    placeholder={data.country}
                                />
                            </View>
                            {/* <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>Country</Text>
                                <TextInput style={styles.formInput} value={data.country} onChangeText={(text) => InpChnage(text, 'country')} />
                            </View> */}
                            <View style={[styles.inputGroup, { width: '49%' }]}>
                                <Text style={styles.formLabel}>City</Text>
                                <TextInput style={styles.formInput} value={data.city} onChangeText={(text) => InpChnage(text, 'city')} />
                            </View>
                        </View>


                        <View style={styles.inputGroup}>
                            <Text style={styles.formLabel}>Your bio</Text>
                            <TextInput style={[styles.formInput, { height: 110, textAlignVertical: "top" }]}
                                multiline={true}
                                numberOfLines={4}
                                value={data.bio} onChangeText={(text) => InpChnage(text, 'bio')} />
                        </View>



                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }}></View>



                    <Text style={[styles.formLabel, { padding: 20 }]}>Suggestion</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', marginVertical: -15, }}>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>

                            {
                                badges?.slice(0, 6).map((badge) => (
                                    <BadgeItem key={badge?._id} badge={badge} index={badge?._id} />
                                ))
                            }





                            <TouchableOpacity onPress={() => setModel(true)} style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                                <Text style={styles.tagButtonText}>Show More</Text>
                            </TouchableOpacity>



                        </View>




                    </View>


                    <View style={styles.container}>

                        <PrimaryButton title='Update' margintop={20} marginbottom={20} onPress={UpdateProfile} />
                    </View>

                </ScrollView>

                <Dialog visible={model1} style={{ backgroundColor: "#fff" }} onDismiss={() => setModel1(false)}>
                    <Dialog.Content>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.dark }}>Choose...</Text>
                            </View>
                            <TouchableOpacity onPress={() => setModel1(false)}>
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

                <Dialog visible={model} style={{ backgroundColor: "#fff" }} onDismiss={() => setModel(false)}>
                    <Dialog.Content>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingBottom: 10, marginTop: -8 }}>
                            <View>
                                <Text style={{ fontSize: 16, fontWeight: '700', color: Colors.dark }}>More Badges...</Text>
                            </View>

                            <TouchableOpacity onPress={() => setModel(false)}>
                                <IconAntDesign name='close' size={22} color={Colors.dark} style={{ marginBottom: 0 }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginHorizontal: -24, borderBottomWidth: 1, borderBottomColor: '#D9D9D9' }} />

                        <View style={{ flexDirection: 'row', marginHorizontal: -24, flexWrap: 'wrap', padding: 0, alignItems: 'center', justifyContent: 'center', marginTop: 10, }}>

                            {
                                badges?.slice(6, badges?.length).map((badge) => (
                                    <BadgeItem key={badge?._id} badge={badge} index={badge?._id} />
                                ))
                            }





                            <TouchableOpacity onPress={() => setModel(false)} style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                                <Text style={styles.tagButtonText}>Show Less</Text>
                            </TouchableOpacity>







                        </View>

                    </Dialog.Content>

                </Dialog>


            </SafeAreaView >
    )
}

export default ProfileEdit

const styles = StyleSheet.create({
    container: { padding: 20 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},


    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },
    tagButton: { backgroundColor: Colors.white, padding: 10, margin: 2, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonActive: { backgroundColor: Colors.lightGray, padding: 10, margin: 2, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    chnageProfileTxt: { fontFamily: Fonts.primary, fontSize: 16, color: '#6C63FF' },

    inputGroup: { paddingVertical: 10 },
    formLabel: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, fontWeight: '700', marginBottom: 5, },
    formInput: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, borderColor: '#BABABA', borderWidth: 1, borderRadius: 10, paddingLeft: 20, width: '100%', height: 52 },
    dateTxt: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, lineHeight: 50 },


    dropdown: { height: 52, borderColor: '#BABABA', borderWidth: 1, borderRadius: 8, paddingLeft: 20, paddingRight: 10 },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },


    tagList: { width: '100%', flexDirection: 'row', alignItems: 'center' },
    chooseType: { backgroundColor: "#f2f2f2", padding: 15, marginBottom: 3, borderRadius: 20 },
    chooseTypeText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

})