import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import { IconAntDesign, IconEntypo, IconFontAwesome, IconSimpleLineIcons } from '../components/Icons';
import { SVGClockPlusFinal, SVGShare } from '../components/Svgs';



const PostLoading = () => {
    return (
        <SkeletonPlaceholder borderRadius={4}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 60, height: 60, borderRadius: 50 }} />
                <View style={{ marginLeft: 20 }}>
                    {/* <Image style={{ width: 120, height: 20 }} src={requre('./src/assets/image.png')} /> */}
                    <Image style={{ width: "100%", height: Dimensions.get('window').height - 53 }} source={require('../../assets/images/home/1.png')} />
                    <Text style={{ marginTop: 6, fontSize: 14, lineHeight: 18 }}>Hello world</Text>
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

export default PostLoading

const styles = StyleSheet.create({
    mainImage: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
    userImage: { width: 40, height: 40, borderRadius: 100 },
    userName: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', paddingLeft: 15, paddingRight: 15, color: "#000" },

    followButton: { backgroundColor: Colors.white, padding: 5, borderRadius: 15, width: 75 },
    followText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: Colors.red, textAlign: 'center' },

    followingButton: { backgroundColor: Colors.primary, padding: 5, borderRadius: 15, width: 75 },
    followingText: { fontFamily: Fonts.primary, fontSize: 14, fontWeight: '700', color: "#000080", textAlign: 'center' },

    postTitle: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '600', color: Colors.white, marginTop: 10, paddingRight: 30 },
    readMore: { fontFamily: Fonts.primary, fontSize: 10, fontWeight: '500', color: Colors.white, marginTop: 5 },

    topBarHeadings: { fontFamily: Fonts.primary, fontSize: 16, padding: 3, color: Colors.white },
    pipe: { fontFamily: Fonts.primary, fontSize: 23, padding: 3, fontWeight: '500', color: Colors.white },

    rightContainer: { alignItems: 'flex-end', justifyContent: 'flex-end', top: Dimensions.get('window').height - 430, padding: 20 },
    actionButton: { padding: 10, marginTop: 20 },
    actionText: { fontFamily: Fonts.primary, fontSize: 12, fontWeight: '700', color: Colors.white, textAlign: 'center' },


    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },
    rewardHeadingTitle: { fontFamily: Fonts.primary, fontSize: 16, color: Colors.dark, textAlign: 'center', padding: 10 },
    rewardModelInput: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#FFE8B2', textAlign: 'center', padding: 10, width: 170 },
    rewardModelButton: { fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 12 },

    sheetContainer: { paddingTop: 200, },
    sheetContentContainer: { backgroundColor: "white", },
    itemContainer: { padding: 6, margin: 6, backgroundColor: "#eee", },

    dropdown: { width: 80, fontFamily: Fonts.primary, fontSize: 16, backgroundColor: '#D0D0D0', textAlign: 'center', padding: 4, paddingLeft: 10 },
    itemContainerStyle: { width: 100, },
    itemTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },
    selectedTextStyle: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, },


})