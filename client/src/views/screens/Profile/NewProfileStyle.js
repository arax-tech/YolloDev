import { Dimensions, StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors';
import Fonts from '../../../constants/Fonts';
import { Color, FontFamily } from "./GlobalStyles";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    container: { padding: 20, backgroundColor : Colors.white },


    figures: {
        color: Color.darkslategray,
        fontSize: 18,
        top: "0%",
        textAlign: "left",
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
    },
    reactions: {
        fontSize: 14,
        textAlign: "left",
        color: Color.black,
        fontFamily: FontFamily.poppinsRegular,
    },


    userName1: {
        fontFamily: FontFamily.poppinsSemibold,
        fontWeight: "600",
        fontSize: 10,
        textAlign: "center",
        color: Color.black,
    },
    username: {
        textAlign: "center",
        fontSize: 15,
        color: Color.black,
        fontFamily: FontFamily.poppinsRegular,
    },

    userImage: {
        borderRadius: 7,
        width: 102,
        height: 104,
    },
    description: {
        marginBottom : -12,

        color: "#939393",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        textAlign: "center",
        fontFamily: FontFamily.poppinsRegular,
    },
    text: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, textAlign: 'center' },

    modelList: { flex: 1, flexDirection: 'row', alignItems: "center", borderBottomWidth: 2, borderBottomColor: Colors.borderGray },
    modelInside: { flex: 1, flexDirection: 'row', alignItems: "center", paddingLeft: 20 },
    modelImage: { height: 20, width: 20, marginRight: 10 },
    modelTitle: { fontFamily: Fonts.primary, fontSize: 14, color: Colors.dark, },

    buttonInfo: { backgroundColor: Colors.buttonInfo, paddingVertical: 8, paddingHorizontal: 20, margin: 5, borderRadius: 20, zIndex: 1 },
    buttonInfoText: { fontFamily: Fonts.primary, fontSize: 13, color: Colors.white, textAlign: 'center', fontWeight: '700' },

    followingButton: { backgroundColor: Colors.primary, paddingVertical: 8, paddingHorizontal: 20, margin: 5, borderRadius: 20, zIndex: 1 },
    followingText: { fontFamily: Fonts.primary, fontSize: 13, fontWeight: '700', color: "#000080", textAlign: 'center' },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center" },
    tabBtn: { width: deviceWidth / 3, flexDirection: 'row', padding: 15, justifyContent: 'center' },
    tabBtnActive: { borderBottomWidth: 2, borderColor: "#262626" },

    tagButton: { backgroundColor: Colors.white, padding: 9, paddingHorizontal: 8, margin: 2, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600', paddingLeft: 3 },
});
export default styles
