import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Colors from '../../../constants/Colors';
import { IconAntDesign, IconEntypo, IconFeather, IconFontisto } from '../../components/Icons';
import { OpenSheetAction } from '../../../redux/actions/ReactionAction';
import Fonts from '../../../constants/Fonts';
import { useNavigation } from '@react-navigation/native';

const MemorySignlePost = ({ item }) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [postActive, setPostActive] = useState(0)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }} forceInset={{ top: 'always' }}>
            <View style={[{ flex: 1, height: Dimensions.get('window').height }]}>


                {/* Top Bar */}
                <View style={{ position: 'absolute', zIndex: 1, top: 0, paddingHorizontal: 25, paddingVertical: 20, width: Dimensions.get('window').width }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Memories')}>
                            <IconAntDesign name='arrowleft' size={23} color={Colors.white} />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", flexDirection: "row", }}>
                            <IconAntDesign name='heart' size={18} color={Colors.white} />
                            <Text style={{ color: "#fff", fontSize: 16, marginLeft: 3, marginTop: -2 }}> {item?.likes.length + item?.shares.length + item?.comments.length}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ position: 'absolute', zIndex: 1, top: 40, paddingHorizontal: 25, paddingVertical: 20, width: Dimensions.get('window').width }}>

                    <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: 'flex-end' }}>
                        <View style={{ flex: 2, flexDirection: "row", justifyContent: "flex-end" }}>
                            {
                                item?.images.length > 1 && (
                                    item.images[0] ? item.images.map((image, index) => (
                                        <TouchableOpacity key={index} onPress={() => setPostActive(index)} style={{ borderBottomColor: index === postActive ? Colors.primary : Colors.white, borderBottomWidth: 2, width: 20, height: 50, marginRight: 5 }}>
                                            <Text>{` `}</Text>
                                        </TouchableOpacity>

                                    )) : ""
                                )
                            }
                        </View>

                    </View>
                </View>



                {/* Post Detail With User Info */}
                <View style={{ position: 'absolute', zIndex: 1, bottom: 15, padding: 15 }}>



                    <View>
                        <Text style={styles.postTitle}>{item?.caption.length > 35 ? item?.caption.substring(0, 35) + "..." : item?.caption}</Text>
                        <TouchableOpacity onPress={() => dispatch(OpenSheetAction(true, item, 1))} >
                            <Text style={styles.readMore}>Read More</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Main Image */}
                <Image resizeMode="cover" style={styles.mainImage} source={{ uri: item.images[postActive].image }} />



                {/* Right Side Icons */}
                <View style={styles.rightContainer}>
                    <View style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>


                        <TouchableOpacity style={{ backgroundColor: Colors.primary, padding: 10, borderRadius: 30, paddingHorizontal: 15, flexDirection: "row", alignItems: "center", justifyContent: "center" }} onPress={() => navigation.navigate('Add')}>
                            <Text style={styles.userName}> Re-Post </Text>
                            <IconFontisto name='share-a' size={15} color={"#000080"} />
                        </TouchableOpacity>
                    </View>


                </View>
            </View>
        </SafeAreaView>
    )
}

export default MemorySignlePost


const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, height: Dimensions.get("window").height },

    postTitle: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '600', color: Colors.white, marginTop: 10, paddingRight: 30 },
    readMore: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '500', color: Colors.white, marginTop: 5 },

    topBarHeadings: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, color: Colors.white },
    pipe: { fontFamily: Fonts.primary, fontSize: 23, padding: 3, fontWeight: '500', color: Colors.white },

    rightContainer: { alignItems: 'flex-end', justifyContent: 'flex-end', top: Dimensions.get('window').height - 90, padding: 20 },
    actionButton: { padding: 10, marginTop: 20 },
})