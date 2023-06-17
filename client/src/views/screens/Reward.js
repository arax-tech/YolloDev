import { StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, Text, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import Colors from '../../constants/Colors'
import Fonts from '../../constants/Fonts'
import { ScrollView } from 'react-native-gesture-handler'
import { IconAntDesign, IconFeather, IconSimpleLineIcons } from '../components/Icons'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../components/Loading'
import moment from 'moment';
import { AuthUserAction } from '../../redux/actions/AuthAction'

const Reward = ({ navigation }) => {

    const dispatch = useDispatch();

    const { loading, diamonds } = useSelector((state) => state.user);
    // useEffect(() => {
    //     const getUserDiamonds = navigation.addListener('focus', async () => {
    //         await dispatch(AuthUserAction());
    //     });
    //     return getUserDiamonds;

    // }, [dispatch])
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
                <ScrollView>

                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ flex: 1, }}>
                                <Text style={[styles.headerTitle, { fontSize: 25 }]}>Rewards</Text>
                            </View>
                        </View>

                    </View>


                    <View style={[styles.alignItemsCenter, { padding: 20 }]}>

                        <View style={styles.header}>
                            <Text style={styles.headerSubTitle}>You have total <Text style={{ color: Colors.primary }}>{diamonds?.diamonds}</Text> Yollo Diamonds</Text>
                        </View>
                        <Image style={styles.rewardImage} resizeMode='contain' source={require('../../assets/images/reward/icon.png')} />
                        {/* <Text style={styles.headerSubTitle}><Text style={{ color: Colors.primary }}>Test !</Text> send you  <Text style={{ fontWeight: '800' }}>100</Text> diamonds</Text> */}

                        <View style={[styles.alignItemsCenter, { flexDirection: 'row', backgroundColor: '#EEEEEE', padding: 5, marginTop: 10 }]}>
                            {/* <Image style={styles.rewardErrorImage} resizeMode='contain' source={require('../../assets/images/icons/error-black.png')} /> */}
                            <IconAntDesign name='exclamationcircleo' size={13} color={Colors.dark} style={{ opacity: 0.4, marginRight: 3 }} />

                            <Text style={styles.rewardError}> Spend 30 more seconds to get another diamond</Text>

                        </View>

                    </View>

                    <View style={[styles.rewardInfo, { borderColor: '#D9D9D9', borderTopWidth: 2, borderBottomWidth: 2, padding: 10 }]}>
                        <IconAntDesign name='questioncircleo' size={17} color={"#FF375F"} style={{ marginHorizontal: 4 }} />
                        <Text style={{ fontWeight: '700' }}>How Yollo Diamonds Works</Text>
                        <View style={styles.contentRight}>
                            <IconAntDesign name='arrowright' size={20} color={Colors.primary} style={{ marginHorizontal: 4 }} />

                        </View>
                    </View>






                    <Text style={{ paddingLeft: 20, paddingVertical: 10, color: '#051532', fontWeight: '700', fontSize: 20 }}>Recent History</Text>


                    {
                        diamonds && diamonds?.transactions?.map((transaction) => (
                            <View key={transaction?._id} style={styles.rewardList}>
                                {
                                    transaction?.user.image ? (
                                        <Image style={styles.transactionImage} source={{ uri: transaction?.user.image }} />
                                    ) : (
                                        <Image style={styles.transactionImage} source={require('../../assets/images/placeholder.jpg')} />
                                    )
                                }

                                <View style={styles.rewardMainTitles}>
                                    <Text style={{ fontWeight: '700' }}> {transaction?.user.first_name} {transaction?.user.last_name} </Text>
                                    <Text style={styles.rewardTime}>{moment(transaction?.tranAt).fromNow()}</Text>
                                </View>

                                <View style={styles.contentRight}>
                                    <TouchableOpacity onlong style={[styles.rewardButton, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '70%' }]}>
                                        {
                                            transaction?.type === "Sender" ? (
                                                <IconFeather name='arrow-up-left' size={15} color={"#AC4646"} />
                                            ) : (
                                                <IconFeather name='arrow-down-right' size={15} color={"#5CBA53"} />
                                            )
                                        }

                                        <Text style={styles.notificationButtonText}>{transaction?.diamonds}</Text>
                                        <IconSimpleLineIcons name='diamond' size={15} color={Colors.primary} style={{}} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        ))
                    }








                </ScrollView>


            </SafeAreaView >
    )
}

export default Reward

const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.white },

    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 10, backgroundColor: Colors.white, borderBottomWidth: 2, borderBottomColor: '#F5F5F5' },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },

    settingBackButton: {},


    rewardImage: { width: 230 },
    headerSubTitle: { fontFamily: Fonts.primary, fontSize: 18, fontWeight: '500', color: Colors.dark },
    rewardInfo: { flexDirection: 'row', padding: 10, alignItems: "center", justifyContent: "center", backgroundColor: Colors.white, marginTop: 2, marginBottom: 5 },
    rewardList: { flexDirection: 'row', padding: 10, backgroundColor: Colors.white, marginTop: 2, marginBottom: 5, borderBottomColor: Colors.lightGray, borderBottomWidth: 1 },
    rewardErrorImage: { width: 15, height: 15, marginRight: 5 },
    rewardError: { fontFamily: Fonts.primary, color: Colors.dark, fontSize: 12.6, opacity: 0.4, },
    contentRight: { flex: 1, alignItems: 'flex-end', marginTop: -3 },

    rewardMainTitles: { flexDirection: 'column', marginHorizontal: 10, width: '40%' },
    transactionImage: { width: 36, height: 36, borderRadius: 30 },

    rewardTime: { fontFamily: Fonts.primary, fontSize: 11, marginTop: 3 },
    rewardButton: { backgroundColor: Colors.white, borderColor: '#949494', borderWidth: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20 },
    notificationButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark },

    alignItemsCenter: { alignItems: "center", justifyContent: 'center' }
})