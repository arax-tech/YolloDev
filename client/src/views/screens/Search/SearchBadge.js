import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial } from '../../components/Icons'

const components = {
    IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial,
}
function IcomComponent({ type, name, size, color }) {
    const SpecificIcon = components[type]
    return <SpecificIcon name={name} size={size} color={color} style={{ marginRight: 3 }} />
}

const SearchBadge = ({ badges, start }) => {

    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', }}>
            {
                start === false ?
                    badges?.length > 0 ?
                        badges?.map((badge) => (
                            <View key={badge?._id} style={styles.tagList}>
                                <TouchableOpacity style={[styles.tagButton, { padding: 10 }]}>
                                    <IcomComponent type={`Icon${badge.type}`} name={badge?.icon} size={15} color={badge?.color} />
                                    <Text style={styles.tagButtonText}>{badge?.name}</Text>
                                </TouchableOpacity>
                                <Text style={[styles.tagButtonText, { opacity: 0.5 }]}>{badge?.used ? badge?.used : 0 } people with same interest</Text>
                            </View>
                        ))
                        : (
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 40 }}>No result found...</Text>
                            </View>
                        )


                    : (
                        <View>
                            <Text style={{ fontSize: 16, color: Colors.dark, textAlign: 'center', paddingTop: 30 }}>Search Badges...</Text>
                        </View>
                    )
            }







        </View>
    )
}

export default SearchBadge




const styles = StyleSheet.create({
    tagButton: { backgroundColor: Colors.white, padding: 5, paddingHorizontal: 8, marginHorizontal: 2, marginVertical: 5, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600' },
    tagList: { width: '100%', flexDirection: 'row', alignItems: 'center', borderColor: '#E4E4E4', borderBottomWidth: 1, borderTopWidth: 1, paddingHorizontal: 20 }
})