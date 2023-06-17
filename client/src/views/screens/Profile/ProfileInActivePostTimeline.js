import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import Colors from '../../../constants/Colors'
import InActiveSignlePost from './InActiveSignlePost'

const ProfileInActivePostTimeline = () => {
    const { loading, profilePostLikes } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar hidden barStyle={'dark-content'} />
                <FlatList
                    data={profilePostLikes}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <InActiveSignlePost key={item._id} item={item} />
                    )}
                />
            </SafeAreaView>
    )
}

export default ProfileInActivePostTimeline
