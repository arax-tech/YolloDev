import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from '../css/ProfileStyle'
import { IconAntDesign, IconIonicons } from '../../components/Icons'
import Colors from '../../../constants/Colors'
import { useNavigation } from '@react-navigation/native'

const ProfileSinglePost = ({ post, navigate }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate(navigate)}>

            <View style={styles.iconContainer}>

                <View style={styles.actionButton}>
                    <IconIonicons name='eye-outline' size={19} color={Colors.white} />
                    <Text style={styles.actionText}>{post?.views.length}</Text>
                </View>


                <View style={styles.actionButton}>
                    <IconAntDesign name='hearto' size={15} color={Colors.white} style={{ marginTop: 3 }} />
                    <Text style={styles.actionText}>{post?.likes.length}</Text>
                </View>


                <View style={styles.actionButton}>
                    <IconAntDesign name='message1' size={15} color={Colors.white} style={{ marginTop: 3 }} />
                    <Text style={styles.actionText}>{post?.comments.length}</Text>
                </View>
            </View>

            <Image style={styles.mainImage} source={{ uri: post.images[0] ? post.images[0].image : "" }} resizeMode='contain' />
        </TouchableOpacity>
    )
}

export default ProfileSinglePost