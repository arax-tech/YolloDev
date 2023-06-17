import { StatusBar, StyleSheet, TouchableOpacity, Text, View, SafeAreaView, ScrollView, Dimensions, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'

import { IconAntDesign } from '../../components/Icons';



import { useDispatch, useSelector } from 'react-redux';

import Fonts from '../../../constants/Fonts';
import Colors from '../../../constants/Colors';
import SearchTop from './SearchTop';
import SearchHashtag from './SearchHashtag';
import SearchUser from './SearchUser';
import SearchBadge from './SearchBadge';
import Loading from '../../components/Loading';
import { SearchAction } from '../../../redux/actions/SearchAction';
import { APP_URL } from '../../../redux/constants/App';

import axios from 'axios'
import MiniLoading from '../../components/MiniLoading';


const Search = ({ route, navigation }) => {
    const dispatch = useDispatch();

    const { HashTag } = route.params;

    const { loading, posts, users, badges } = useSelector((state) => state.search);

    const [searchPosts, setSearchPosts] = useState([]);
    const [searchBadges, setSearchBadges] = useState(badges);
    const [searchUsers, setSearchUsers] = useState([]);
    const [searchHashtags, setSearchHashtags] = useState([]);


    const [search, setSearch] = useState('');
    const [start, setStart] = useState(true);

    useEffect(() => {

        const getSearchData = navigation.addListener('focus', async () => {
            await dispatch(SearchAction());
        });
        return getSearchData;
    }, [dispatch, navigation])

    useEffect(() => {

        if (HashTag) {
            setSearch(HashTag);
            setIsActive("Hashtag");
            searchFilter(HashTag)
        }
    }, [HashTag])



    const [isActive, setIsActive] = useState('Top')

    const setStatusFilter = (status) => {
        setIsActive(status);
    }

    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();

    const [keyword, setKeyword] = useState(0);

    // console.log(`search users = ${searchUsers.length}`)


    const searchFilter = (text) => {
        if (text) {

            setSearch(text);
            setStart(false)

            if (isActive === "Top" && text.length > 0) {
                setIsLoading(true);
                axios.get(`${APP_URL}/user/search/post/${text}?page=${currentPage}`)
                    .then(response => {
                        setSearchPosts(response?.data?.posts);
                        setTotalPages(response.data.totalPages);
                        setIsLoading(false);
                    });
            } else if (isActive === "Hashtag" && text.length > 0) {
                setIsLoading(true);
                axios.get(`${APP_URL}/user/search/hashtag/${text}?page=${currentPage}`)
                    .then(response => {
                        setSearchHashtags(response?.data?.posts);
                        setTotalPages(response.data.totalPages);
                        setIsLoading(false);
                    });
            }else if (isActive === "User" && text.length > 0) {
                setIsLoading(true);
                axios.get(`${APP_URL}/user/search/user/${text}`)
                    .then(response => {
                        setSearchUsers(response?.data?.users);
                        setIsLoading(false);
                    });
            }else if (isActive === "Badge" && text.length > 0) {
                setIsLoading(true);
                axios.get(`${APP_URL}/user/search/badge/${text}`)
                    .then(response => {
                        setSearchBadges(response?.data?.badges);
                        setIsLoading(false);
                    });
            }


            // const newUsersData = searchUsers?.filter((user) => {
            //     const userData = user.first_name ? user.first_name.toUpperCase() : ''.toUpperCase();
            //     const textData = text.toUpperCase();
            //     return userData.indexOf(textData) > -1;

            // });

            
            // const newPostsData = searchPosts?.filter((item) => {
            //     const itemData = item.caption ? item.caption.toUpperCase() : ''.toUpperCase();
            //     const textData = text.toUpperCase();
            //     return itemData.indexOf(textData) > -1;

            // });

            // const newBadgesData = searchBadges?.filter((badge) => {
            //     const badgeData = badge.name ? badge.name.toUpperCase() : ''.toUpperCase();
            //     const textData = text.toUpperCase();
            //     return badgeData.indexOf(textData) > -1;

            // });

            // const newTagsData = searchHashtags?.filter((item) => {
            //     const itemData = item.hashtag ? item.hashtag.toUpperCase() : ''.toUpperCase();
            //     const textData = text.toUpperCase();
            //     return itemData.indexOf(textData) > -1;

            // });



            // setSearchUsers(newUsersData);
            // setSearchBadges(newBadgesData);
            // setSearchHashtags(newTagsData);
            

        } else {
            setStart(true)
            setSearchPosts(posts);
            setSearchUsers(users);
            setSearchBadges(badges);
            setSearchHashtags(posts);
            setSearch(text);
        }
    }


    

    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>


                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />

                    <View style={styles.postHeaderContainer}>

                        <TouchableOpacity style={[styles.postBackButton, { width: '10%' }]} onPress={() => navigation.goBack()}>
                            <IconAntDesign name='arrowleft' size={25} color={Colors.dark} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#949494", padding: 5, paddingHorizontal: 10, borderRadius: 30, width: "90%" }}>
                            <IconAntDesign name='search1' size={20} color={Colors.dark} />
                            <TextInput value={search} onChangeText={(text) => searchFilter(text)} style={{ flex: 1, height: 30, marginLeft: 5, lineHeight: 20, padding: 0, }} placeholder='Search...' />
                        </View>

                    </View>

                    <View style={styles.tabContainer}>
                        <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 0 }}>


                            <TouchableOpacity style={[styles.tabBtn, isActive === "Top" && styles.tabBtnActive, { width: "25%" }]} onPress={() => {
                                setStatusFilter("Top")
                                setSearch(null)
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.tabText, { color: isActive === "Top" ? Colors.primary : Colors.dark }]}>Top</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.tabBtn, isActive === "Hashtag" && styles.tabBtnActive, { width: "25%" }]} onPress={() => {
                                setStatusFilter("Hashtag")
                                setSearch(null)
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.tabText, { color: isActive === "Hashtag" ? Colors.primary : Colors.dark }]}>Hashtag</Text>
                                </View>
                            </TouchableOpacity>


                            {/* <TouchableOpacity style={[styles.tabBtn, isActive === "NearYou" && styles.tabBtnActive, { width: "25%" }]} onPress={() => setStatusFilter("NearYou")}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.tabText, { color: isActive === "NearYou" ? Colors.primary : Colors.dark }]}>Near You</Text>
                                </View>
                            </TouchableOpacity> */}


                            <TouchableOpacity style={[styles.tabBtn, isActive === "User" && styles.tabBtnActive, { width: "25%" }]} onPress={() => {
                                setStatusFilter("User")
                                setSearch(null)
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.tabText, { color: isActive === "User" ? Colors.primary : Colors.dark }]}>User</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={[styles.tabBtn, isActive === "Badge" && styles.tabBtnActive, { width: "25%" }]} onPress={() => {
                                setStatusFilter("Badge")
                                setSearch(null)
                            }}>
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[styles.tabText, { color: isActive === "Badge" ? Colors.primary : Colors.dark }]}>Badge</Text>
                                </View>
                            </TouchableOpacity>



                        </View>
                    </View>

                    {
                        isLoading ? <MiniLoading /> : (
                            <>
                                {isActive === "Top" && <SearchTop posts={search?.length > 0 ? searchPosts : posts} />}
                                {isActive === "Hashtag" && <SearchHashtag posts={searchHashtags} start={start} text={search} />}
                                {/* {isActive === "NearYou" && <SearchNearYou />} */}
                                {isActive === "User" && <SearchUser users={searchUsers} start={start} />}
                                {isActive === "Badge" && <SearchBadge badges={searchBadges} start={start} />}
                            </>
                        )
                    }




                </ScrollView>
            </SafeAreaView >
    )
}

export default Search

const styles = StyleSheet.create({
    container: { padding: 20 },
    postHeaderContainer: { flexDirection: 'row', alignItems: 'center', borderBottomColor: Colors.lightGray, borderBottomWidth: 1, padding: 20 },


    tabText: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center", borderTopColor: "#C6C6C6", borderTopWidth: 2 },
    tabBtn: { flexDirection: 'row', padding: 5, paddingVertical: 10, justifyContent: 'center' },
    tabBtnActive: { borderBottomWidth: 2, borderColor: Colors.primary }
})