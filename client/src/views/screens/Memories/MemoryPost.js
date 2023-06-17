import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MemoryPost = ({ post, onPress }) => {

    return (
        <View key={post?._id} style={styles.box}>
            <TouchableOpacity style={styles.boxInner} onPress={onPress}>
                <Image style={{ width: "100%", borderRadius: 8, height: 110 }} source={{ uri: post.images[0] ? post.images[0].image : "" }} />
            </TouchableOpacity>
        </View>

    )
}

export default MemoryPost


const styles = StyleSheet.create({
    box: { width: '33.3%', padding: 2, elevation: 10 },
    boxInner: { flex: 1, elevation: 5 },
})