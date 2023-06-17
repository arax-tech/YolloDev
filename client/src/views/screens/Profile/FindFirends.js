import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Fonts from '../../../constants/Fonts'
import Colors from '../../../constants/Colors'
import Loading from '../../components/Loading'
import { SearchAction } from '../../../redux/actions/SearchAction'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
import { IconAntDesign, IconFontAwesome5 } from '../../components/Icons'
import SearchUser from '../Search/SearchUser'

const FindFirends = ({ navigation }) => {
    const dispatch = useDispatch();

    const { loading, users } = useSelector((state) => state.search);

    const [searchUsers, setSearchUsers] = useState(users);

    const [search, setSearch] = useState('');
    const [start, setStart] = useState(true);

    useEffect(() => {

        const getSearchData = navigation.addListener('focus', async () => {
            await dispatch(SearchAction());
        });
        return getSearchData;
    }, [dispatch, navigation])





    const searchFilter = (text) => {
        if (text) {
            setStart(false)

            const newUsersData = searchUsers?.filter((user) => {
                const userData = user.first_name ? user.first_name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return userData.indexOf(textData) > -1;

            });
            setSearchUsers(newUsersData);
            setSearch(text);

        } else {
            setStart(true)
            setSearchUsers(users);
            setSearch(text);
        }
    }

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>



                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View style={styles.headerContainer}>

                        <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={styles.settingBackButton} onPress={() => navigation.goBack()}>
                                <IconAntDesign name='arrowleft' size={23} color={Colors.dark} />
                            </TouchableOpacity>
                            <View style={{ flex: 1, }}>
                                <Text style={styles.headerTitle}>Find Friends</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.postHeaderContainer}>


                        <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#949494", padding: 5, paddingHorizontal: 10, borderRadius: 30, width: "100%" }}>
                            <IconAntDesign name='search1' size={20} color={Colors.dark} />
                            <TextInput value={search} onChangeText={(text) => searchFilter(text)} style={{ flex: 1, height: 30, marginLeft: 5, lineHeight: 20, padding: 0, }} placeholder='Search...' />
                        </View>

                    </View>

                    {
                        start && start === true ? (
                            <>
                                <TouchableOpacity style={[styles.settingList, { marginTop: 1 }]} onPress={() => navigation.navigate('Referral')}>
                                    <View style={styles.iconBox}>
                                        {/* <IconFeather name='user-plus' size={15} color='#000' /> */}
                                        <Image style={{ width: 20 }} resizeMode='contain' source={require("../../../assets/images/icons/ci_user-plus.png")} />
                                    </View>
                                    <Text style={styles.settingListTitle}>Invite friends to earn 1000 Diamonds </Text>
                                    <View style={styles.contentRight}>
                                        <IconFontAwesome5 name='chevron-right' size={10} color='#000' />
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.settingList, { marginTop: 1 }]} onPress={() =>
                                    navigation.navigate('ProfileTabs', {
                                        screen: 'ProfileTabs',
                                        params: { screen: 'Suggested' },
                                    })}>
                                    <View style={styles.iconBox}>
                                        <Image style={{ width: 20 }} resizeMode='contain' source={require("../../../assets/images/icons/bi_people.png")} />
                                        {/* <IconFontAwesome5 name='users' size={15} color='#000' /> */}
                                    </View>
                                    <Text style={styles.settingListTitle}>Suggested </Text>
                                    <View style={styles.contentRight}>
                                        <IconFontAwesome5 name='chevron-right' size={10} color='#000' />
                                    </View>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <SearchUser users={searchUsers} start={start} />

                        )
                    }


                </ScrollView>
            </SafeAreaView>
    )
}

export default FindFirends

const styles = StyleSheet.create({
    container: { padding: 20 },
    headerContainer: { flexDirection: 'row', alignItems: 'center', paddingTop: 2, backgroundColor: Colors.white, },
    headerTitle: { fontFamily: Fonts.primary, fontSize: 22, fontWeight: '700', color: Colors.dark, textAlign: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' },


    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: "#F5F5F5", borderBottomWidth: 2, padding: 20, paddingTop: 5 },

    iconBox: { width: 45, height: 45, alignItems: "center", justifyContent: "center", backgroundColor: "#D9D9D9", padding: 10, borderRadius: 100 },
    tabText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center", borderTopColor: "#C6C6C6", borderTopWidth: 2 },
    tabBtn: { flexDirection: 'row', padding: 5, paddingVertical: 10, justifyContent: 'center' },
    tabBtnActive: { borderBottomWidth: 2, borderColor: Colors.primary },

    settingList: { flexDirection: 'row', alignItems: 'center', padding: 10, paddingHorizontal: 20, backgroundColor: Colors.white, borderBottomColor: "#F5F5F5", borderBottomWidth: 1, },
    settingIcon: {},
    settingListTitle: { paddingLeft: 10, fontFamily: Fonts.primary, fontSize: 14, fontWeight: '600', alignItems: 'center', justifyContent: 'center' },
    contentRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center', },
})