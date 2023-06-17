import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../constants/Colors'
import { IconAntDesign } from '../../components/Icons'
import Fonts from '../../../constants/Fonts'

import DateTimePicker from '@react-native-community/datetimepicker';
import Memories1stWeek from './Memories1stWeek'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { MemoriesAction } from '../../../redux/actions/MemoriesAction'
import Memories2ndWeek from './Memories2ndWeek'
import Memories3rdWeek from './Memories3rdWeek'
import Memories4thWeek from './Memories4thWeek'
import Memories5thWeek from './Memories5thWeek'

const Memories = ({ navigation }) => {

    const dispatch = useDispatch();

    const { loading,
        monthDay1Posts,
        monthDay2Posts,
        monthDay3Posts,
        monthDay4Posts,
        monthDay5Posts,
        monthDay6Posts,
        monthDay7Posts,

        monthDay8Posts,
        monthDay9Posts,
        monthDay10Posts,
        monthDay11Posts,
        monthDay12Posts,
        monthDay13Posts,
        monthDay14Posts,

        monthDay15Posts,
        monthDay16Posts,
        monthDay17Posts,
        monthDay18Posts,
        monthDay19Posts,
        monthDay20Posts,
        monthDay21Posts,

        monthDay22Posts,
        monthDay23Posts,
        monthDay24Posts,
        monthDay25Posts,
        monthDay26Posts,
        monthDay27Posts,
        monthDay28Posts,

        monthDay29Posts,
        monthDay30Posts,
        monthDay31Posts,

    } = useSelector((state) => state.memories)

    // console.log(monthDay16Posts)
    let currentDate = new Date();
    // console.log(currentDate.getMonth() + 1)
    useEffect(() => {
        const getMemories = navigation.addListener('focus', async () => {
            await dispatch(MemoriesAction(currentDate.getMonth() + 1, currentDate.getFullYear()));
        });
        return getMemories;
    }, [dispatch, navigation, currentDate]);


    // Set current date as inital focused date
    useEffect(() => {
        onChangeDate();
    }, [])



    const [memeriesWeek, setMemeriesWeek] = useState();

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    const [month, setMonth] = useState('March');
    const [day, setDay] = useState(15)
    const [year, setYear] = useState(2023)

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);




    const onChangeDate = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        setMonth(monthNames[tempDate.getMonth()]);
        setDay(tempDate.getDate());
        setYear(tempDate.getFullYear());

        let fDate = tempDate.getDate() + "/" + (tempDate.getMonth() + 1) + "/" + tempDate.getFullYear();

        await dispatch(MemoriesAction(tempDate.getMonth() + 1, tempDate.getFullYear()));
        setMemeriesWeek(fDate);
    };


    useEffect(() => {
        onChangeDate()
    }, [])


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };


    const [isActive, setIsActive] = useState('1st')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }



    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />



                <ScrollView>
                    <View style={[styles.headerContainer, { paddingBottom: 10 }]}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Memories</Text>
                            </View>
                        </View>





                    </View>


                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 20, borderBottomWidth: 2, borderBottomColor: "#F5F5F5" }}>
                        <View><Text style={styles.calHeading}>{month}</Text></View>
                        <View><Text style={styles.calHeading}>-</Text></View>
                        <View><Text style={styles.calHeading}>{year}</Text></View>
                        <View />
                        <View />
                        <View />
                        <View />
                        <TouchableOpacity onPress={showDatepicker} >
                            <Text style={{}}>Change</Text>
                            {
                                show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        is24Hour={true}
                                        display="default"
                                        themeVariant="dark"
                                        dayOfWeekFormat=''
                                        onChange={onChangeDate}
                                    />
                                )
                            }
                        </TouchableOpacity>
                    </View>


                    <View style={styles.container}>
                        <View style={styles.tabContainer}>
                            <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 0 }}>


                                <TouchableOpacity style={[styles.tabBtn, isActive === "1st" && styles.tabBtnActive]} onPress={() => setStatusFilter("1st")}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.tabText, { color: isActive === "1st" ? Colors.white : Colors.dark }]}>1st Week</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.tabBtn, isActive === "2nd" && styles.tabBtnActive]} onPress={() => setStatusFilter("2nd")}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.tabText, { color: isActive === "2nd" ? Colors.white : Colors.dark }]}>2nd Week</Text>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity style={[styles.tabBtn, isActive === "3rd" && styles.tabBtnActive]} onPress={() => setStatusFilter("3rd")}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.tabText, { color: isActive === "3rd" ? Colors.white : Colors.dark }]}>3rd Week</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.tabBtn, isActive === "4th" && styles.tabBtnActive]} onPress={() => setStatusFilter("4th")}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.tabText, { color: isActive === "4th" ? Colors.white : Colors.dark }]}>4th Week</Text>
                                    </View>
                                </TouchableOpacity>


                                <TouchableOpacity style={[styles.tabBtn, isActive === "5th" && styles.tabBtnActive]} onPress={() => setStatusFilter("5th")}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={[styles.tabText, { color: isActive === "5th" ? Colors.white : Colors.dark }]}>5th Week</Text>
                                    </View>
                                </TouchableOpacity>



                            </View>

                        </View>
                        {
                            isActive === "1st" &&
                            <Memories1stWeek
                                monthDay1Posts={monthDay1Posts}
                                monthDay2Posts={monthDay2Posts}
                                monthDay3Posts={monthDay3Posts}
                                monthDay4Posts={monthDay4Posts}
                                monthDay5Posts={monthDay5Posts}
                                monthDay6Posts={monthDay6Posts}
                                monthDay7Posts={monthDay7Posts}
                            />


                        }
                        {
                            isActive === "2nd" &&
                            <Memories2ndWeek
                                monthDay8Posts={monthDay8Posts}
                                monthDay9Posts={monthDay9Posts}
                                monthDay10Posts={monthDay10Posts}
                                monthDay11Posts={monthDay11Posts}
                                monthDay12Posts={monthDay12Posts}
                                monthDay13Posts={monthDay13Posts}
                                monthDay14Posts={monthDay14Posts}
                            />
                        }

                        {
                            isActive === "3rd" &&
                            <Memories3rdWeek
                                monthDay15Posts={monthDay15Posts}
                                monthDay16Posts={monthDay16Posts}
                                monthDay17Posts={monthDay17Posts}
                                monthDay18Posts={monthDay18Posts}
                                monthDay19Posts={monthDay19Posts}
                                monthDay20Posts={monthDay20Posts}
                                monthDay21Posts={monthDay21Posts}
                            />
                        }

                        {
                            isActive === "4th" &&
                            <Memories4thWeek
                                monthDay22Posts={monthDay22Posts}
                                monthDay23Posts={monthDay23Posts}
                                monthDay24Posts={monthDay24Posts}
                                monthDay25Posts={monthDay25Posts}
                                monthDay26Posts={monthDay26Posts}
                                monthDay27Posts={monthDay27Posts}
                                monthDay28Posts={monthDay28Posts}
                            />
                        }


                        {
                            isActive === "5th" &&
                            <Memories5thWeek
                                monthDay29Posts={monthDay29Posts}
                                monthDay30Posts={monthDay30Posts}
                                monthDay31Posts={monthDay31Posts}
                            />
                        }
                    </View>
                </ScrollView>
            </SafeAreaView >
    )
}

export default Memories

const styles = StyleSheet.create({
    container: { padding: 5, backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    calHeading: { fontFamily: Fonts.primary, fontSize: 20, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    tabText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark, textAlign: 'center', fontWeight: "700" },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center", padding: 10 },
    tabBtn: { flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', width: "19%", marginHorizontal: '1%', backgroundColor: Colors.borderGray, borderRadius: 15 },
    tabBtnActive: { backgroundColor: Colors.primary, }



})