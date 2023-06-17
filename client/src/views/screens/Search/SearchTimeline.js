import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading';
import Post from '../Post/Post';
import Colors from '../../../constants/Colors';

const SearchTimeline = () => {
    const { loading, posts } = useSelector((state) => state.search);
    // console.log(posts)
    return (
        loading ? <Loading /> :
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
                <StatusBar hidden barStyle={'dark-content'} />
                <FlatList
                    data={posts}
                    pagingEnabled
                    keyExtractor={item => item._id.toString()}
                    renderItem={({ item }) => (
                        <Post key={item._id} item={item} isActive={"ForYou"} />
                    )}
                />
            </SafeAreaView>
    )
}

export default SearchTimeline

const styles = StyleSheet.create({})