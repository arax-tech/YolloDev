import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import Colors from '../../../constants/Colors'
import Post from '../Post/Post'

const ProfileReactedPostTimeline = () => {
    const { loading, profilePostYouLikes } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar hidden barStyle={'dark-content'} />
                <FlatList
                    data={profilePostYouLikes}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} />
                    )}
                />
            </SafeAreaView>
    )
}

export default ProfileReactedPostTimeline
