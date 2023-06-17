import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import ProfileSinglePost from './ProfileSinglePost'
import { IconAntDesign, IconIonicons } from '../../components/Icons'
import styles from '../css/ProfileStyle'

const PublicProfilePost = ({ posts }) => {


    return (
        <SafeAreaView style={{ backgroundColor: Colors.white }}>

            <ScrollView>

                {
                    posts?.length > 0 ? (
                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                            {
                                posts?.map((post, index) => (
                                    <TouchableOpacity key={index} style={styles.imageContainer}>

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
                                ))

                            }
                        </View>
                    ) : (
                        <View style={{ padding: 30 }}>
                            <Text style={{ color: "#000", textAlign: "center" }}>Record not found...</Text>
                        </View>
                    )
                }


            </ScrollView>
        </SafeAreaView>
    )
}

export default PublicProfilePost

