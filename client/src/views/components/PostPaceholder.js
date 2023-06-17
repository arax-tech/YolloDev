import { Animated, Dimensions, Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const PostPaceholder = () => {

    defaultImageAnimated = new Animated.Value(0);
    imageAnimated = new Animated.Value(0);

    handleDefaultImageLoad = () => {
        Animated.timing(defaultImageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    handleImageLoad = () => {
        Animated.timing(imageAnimated, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView>
            <View style={[{ flex: 1, height: Dimensions.get('window').height - 53 }]}>
                {/* Main Image */}
                <Animated.Image resizeMode="cover" style={styles.mainImage} source={{ uri: "https://sdbeerfestival.com/wp-content/uploads/2018/10/placeholder.jpg" }} />
            </View>
        </SafeAreaView >
    )
}

export default PostPaceholder

const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
})