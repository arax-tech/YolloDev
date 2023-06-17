import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'
import { useSelector } from 'react-redux'
import Loading from '../../components/Loading'
import { IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial } from '../../components/Icons'
import IcomComponent from './IcomComponent'





const ProfileInfo = ({ modelHande }) => {
    const { loading, user } = useSelector((state) => state.user);

    return (
        loading ? <Loading /> :
            <SafeAreaView>
                {/* <View style={[styles.container, { marginTop: -40, marginBottom: -5 }]}>
                    <Text style={styles.text}>{user?.bio}</Text>
                </View> */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5, alignItems: 'center', justifyContent: 'center', marginTop: -5 }}>


                    {
                        user?.badges?.slice(0, 6).map((bad) => (
                            <View key={bad?._id} style={styles.tagButton}>
                                <IcomComponent type={`Icon${bad?.badge?.type}`} name={bad?.badge?.icon} size={15} color={bad?.badge?.color} />
                                <Text style={styles.tagButtonText}>{bad?.badge?.name}</Text>
                            </View>
                        ))
                    }

                    {
                        user?.badges?.length > 6 && (
                            <TouchableOpacity onPress={() => modelHande()} style={[styles.tagButton, { backgroundColor: Colors.lightGray }]}>
                                <Text style={styles.tagButtonText}>Show More</Text>
                            </TouchableOpacity>
                        )
                    }


                    {/* 
                                <TouchableOpacity key={index} style={styles.tagButton}>
                                    <IconAntDesign name='tags' size={15} color={"#BE7C5E"} style={{ marginHorizontal: 2 }} />
                                    <Text style={styles.tagButtonText}>{tag.name}</Text>
                                </TouchableOpacity>
                            */}

                </View>


            </SafeAreaView>
    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container: { padding: 20 },
    tagButton: { backgroundColor: Colors.white, padding: 9, paddingHorizontal: 8, margin: 2, borderRadius: 20, borderColor: '#E4E4E4', borderWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    tagButtonText: { fontFamily: Fonts.primary, fontSize: 12, color: Colors.dark, textAlign: 'center', fontWeight: '600', paddingLeft: 3 },
    text: { fontFamily: Fonts.primary, fontSize: 13, textAlign: "justify", color: "#939393", textAlign: 'center', fontWeight: '500', },
})