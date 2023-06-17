import { View, Text, SafeAreaView, StatusBar, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import Post from '../Post/Post'
import Colors from '../../../constants/Colors'
import MemorySignlePost from './MemorySignlePost'

const MemoriesTimeline = () => {
    const { loading, posts } = useSelector((state) => state.memories)
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar hidden barStyle={'dark-content'} />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <MemorySignlePost key={item._id} item={item} />
                    )}
                />
            </SafeAreaView>
    )
}

export default MemoriesTimeline