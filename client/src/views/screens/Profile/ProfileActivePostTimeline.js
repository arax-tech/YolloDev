import { SafeAreaView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import SignlePost from './SignlePost'
import Loading from '../../components/Loading'
import Colors from '../../../constants/Colors'

const ProfileActivePostTimeline = () => {
    const { loading, activePosts } = useSelector((state) => state.user);
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar hidden barStyle={'dark-content'} />
                <FlatList
                    data={activePosts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <SignlePost key={item._id} item={item} />
                    )}
                />
            </SafeAreaView>
    )
}

export default ProfileActivePostTimeline
