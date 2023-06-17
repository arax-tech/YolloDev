import { FlatList, SafeAreaView, StatusBar } from 'react-native'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { FollowingPostsAction } from '../../redux/actions/PostAction'

import Loading from '../components/Loading'

import Colors from '../../constants/Colors'
import Post from './Post/Post'

const FollowingPost = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading, posts } = useSelector((state) => state.post);

    useEffect(() => {
        const getPosts = navigation.addListener('focus', async () => {
            await dispatch(FollowingPostsAction());
        });
        return getPosts;
    }, [dispatch, navigation])




    // const [viewabilityConfiguration, setViewabilityConfiguration] = useState({
    //     waitForInteraction: true,
    //     viewAreaCoveragePercentThreshold: 40,
    // });


    // const onViewFunction = useCallback(async (viewableItems) => {
    //     const { changed } = viewableItems;
    //     await dispatch(PostViewAction(changed[0]?.key))
    // }, [])
    // viewabilityConfig={viewabilityConfiguration}
    // onViewableItemsChanged={onViewFunction}




    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <StatusBar hidden />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} isActive={"Following"} />
                    )}
                />
            </SafeAreaView>
    )
}

export default FollowingPost