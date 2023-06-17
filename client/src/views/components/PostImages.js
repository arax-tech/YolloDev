import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PostImages = ({ setCurrentIndex, images }) => {
    const { height, width } = Dimensions.get('window');
    return (
        <View >
            <FlatList
                data={images}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={e => {
                    const x = e.nativeEvent.contentOffset.x;
                    setCurrentIndex((x / width).toFixed(0));
                }}
                horizontal
                renderItem={({ item, index }) => {
                    return (
                        <View
                            style={{
                                flex: 1,
                                width: width,
                                height: height - 53,
                            }}>
                            <Image key={index} style={styles.mainImage} resizeMode="cover" source={{ uri: item?.image }} />
                        </View>
                    );
                }}
            />
        </View>
    )
}

export default PostImages

const styles = StyleSheet.create({})