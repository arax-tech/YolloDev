import { ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { PostsAction } from '../../redux/actions/PostAction'

import Loading from '../components/Loading'

import Colors from '../../constants/Colors'
import Post from './Post/Post'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PostViewAction } from '../../redux/actions/ReactionAction'
import { NotificationListner, requestUserPermission } from '../../utils/PushNotificationHelpers'
import axios from 'axios'
import { APP_URL } from '../../redux/constants/App'

const Home = ({ navigation }) => {

    const dispatch = useDispatch();


    useEffect(() => {
        requestUserPermission();
        NotificationListner();
    }, [])

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);


    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [isLoading, setIsLoading] = useState(false);


    const getPosts = () => {
        setIsLoading(true);
        axios.get(`${APP_URL}/user/post?page=${currentPage}`)
            .then(response => {
                setPosts([...posts, ...response.data.posts]);
                setTotalPages(response.data.totalPages);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        getPosts();
    }, [currentPage]);


    const renderItem = ({ item }) => {
        return (
            <Post key={item._id} item={item} isActive={"ForYou"} RemoveFormTimeline={RemoveFormTimeline} />
        );
    };

    const renderLoader = () => {
        return (
            isLoading ?
                <View>
                    <ActivityIndicator size="large" color="#ffb300" />
                </View> : currentPage === totalPages && <View style={{ padding: 20 }}><Text>all posts is loaded...</Text></View>
        );
    };

    const loadMoreItem = () => {
        currentPage < totalPages && setCurrentPage(currentPage + 1);
    };




    const RemoveFormTimeline = async (id) => {
        let newPosts = posts.filter(item => item?._id !== id)
        setPosts(newPosts);
    }

    const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
        waitForInteraction: true,
        viewAreaCoveragePercentThreshold: 40,
    });


    const onViewFunction = useCallback(async (viewableItems) => {
        const { changed } = viewableItems;
        await dispatch(PostViewAction(changed[0]?.key))
    }, [])



    // viewabilityConfig = { viewabilityConfiguration }
    // onViewableItemsChanged = { onViewFunction }




    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
            <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
            {
                posts && posts.length > 0 ? (
                    <FlatList
                        data={posts}
                        pagingEnabled
                        keyExtractor={item => item._id.toString()}
                        renderItem={renderItem}

                        ListFooterComponent={renderLoader}
                        onEndReached={loadMoreItem}
                        onEndReachedThreshold={0}
                    />
                ) : (
                    isLoading ? null : <View>
                        <Text style={[styles.header, { marginTop: 3 }]}>No posts to show...</Text>
                    </View>
                )
            }

        </SafeAreaView>
    )
}

export default Home


const styles = StyleSheet.create({
    header: { alignItems: 'center', justifyContent: 'center', padding: 18, backgroundColor: "#f9f9f9" },
})