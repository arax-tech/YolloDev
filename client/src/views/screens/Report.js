import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PrimaryButton } from '../components/Button'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { useDispatch, useSelector } from 'react-redux'
import { REPORT_POST_RESET } from '../../redux/constants/ReactionConstant'
import { ReportPostAction } from '../../redux/actions/ReactionAction'

const Report = ({ route, navigation }) => {
    const dispatch = useDispatch();
    const { message } = useSelector((state) => state.reaction);

    const { post_id } = route.params;
    const [inputShow, setInputShow] = useState(false);
    const [title, setTitle] = useState(null);
    const [input, setInput] = useState(null);
    const [items, setItems] = useState([
        { id: 1, checked: false, name: "Minor safety", },
        { id: 2, checked: false, name: "Dangerous acts and challenges", },
        { id: 3, checked: false, name: "Sucide, self-harm, and discordered eating", },
        { id: 4, checked: false, name: "Bullying and harassment", },
        { id: 5, checked: false, name: "Hatefill behavoir", },
        { id: 6, checked: false, name: "Violent extremism", },
        { id: 7, checked: false, name: "Harmfull misinformation", },
        { id: 8, checked: false, name: "Illegal activities and regulated goods", },
        { id: 9, checked: false, name: "Other", },
    ]);
    const getValue = (id) => {

        let newItems = [...items];
        let index = newItems.findIndex(el => el.id === id);
        newItems[index] = { ...newItems[index], checked: true };
        // alert(newItems[index].name);
        if (newItems[index].name === "Other") {
            setInputShow(true);
            setTitle(input);
        } else {
            setInputShow(false);
            setTitle(newItems[index].name);
        }
        setItems(newItems);

    }

    const reportFunction = async () => {
        if (inputShow === false) {
            if (title === null) {
                ToastAndroid.show("Please select a reason...", ToastAndroid.SHORT);
            } else {
                await dispatch(ReportPostAction(post_id, title))
            }
        } else {
            if (input === null) {
                ToastAndroid.show("Please enter a reason...", ToastAndroid.SHORT);
            } else {
                await dispatch(ReportPostAction(post_id, input))
            }
        }
    }

    useEffect(() => {
        if (message && message === "Report Successfully...") {
            ToastAndroid.show(message, ToastAndroid.SHORT);
            dispatch({ type: REPORT_POST_RESET });
            navigation.goBack();
        }
    }, [dispatch, navigation, message])

    return (

        <SafeAreaView SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            <ScrollView>
                <View style={{ margin: 20 }}>



                    {
                        items.map((item) => (
                            <TouchableOpacity key={item.id} style={styles.reportList} onPress={() => getValue(item.id)}>
                                <View style={styles.reportInside}>
                                    {
                                        item.checked == true ? (
                                            <Image source={require('../../assets/images/icons/radio-selected-circle.png')} resizeMode='contain' style={styles.reportImage} />
                                        ) : (
                                            <Image source={require('../../assets/images/icons/radio-circle.png')} resizeMode='contain' style={styles.reportImage} />
                                        )
                                    }


                                    <Text style={styles.reportTitle}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }


                    {
                        inputShow === true && (
                            <TextInput style={styles.txtInput} placeholder='Type here' value={input} onChangeText={(text) => setInput(text)} />
                        )
                    }


                    <TouchableOpacity onPress={() => navigation.navigate('SupportAndHelp')}>

                        <Text style={{ paddingTop: 20, color: Colors.dark }}>
                            If this is not helpful, contact our <Text style={{ color: Colors.primary }}>Help & Support</Text> team
                        </Text>
                    </TouchableOpacity>
                    <PrimaryButton title='Report' onPress={reportFunction} margintop={30} />

                </View>
            </ScrollView>
        </SafeAreaView >

    )
}

export default Report

const styles = StyleSheet.create({
    reportList: { flexDirection: 'row', alignItems: "center", justifyContent: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray, padding: 15, zIndex: 999, },
    reportInside: { flex: 1, flexDirection: 'row', alignItems: "center" },
    reportImage: { height: 20, width: 20, marginRight: 10 },
    reportTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark },
    txtInput: { fontFamily: Fonts.primary, backgroundColor: Colors.gary, borderRadius: 10, padding: 13, marginVertical: 12, },
})