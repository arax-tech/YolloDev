import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

import MemoryByDay from './MemoryByDay'

const Memories5thWeek = ({ monthDay29Posts, monthDay30Posts, monthDay31Posts }) => {


    const [isActive, setIsActive] = useState('SAT')
    const setStatusFilter = (status) => {
        setIsActive(status);
    }



    return (
        <SafeAreaView>
            <View style={styles.tabContainer}>
                <View style={{ flexDirection: "row", backgroundColor: "#fff", padding: 0 }}>


                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("SAT")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "SAT" ? Colors.dark : Colors.darkLight }]}>29</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "SAT" ? Colors.dark : Colors.darkLight }]}>SAT</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("SUN")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "SUN" ? Colors.dark : Colors.darkLight }]}>30</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "SUN" ? Colors.dark : Colors.darkLight }]}>SUN</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("MON")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "MON" ? Colors.dark : Colors.darkLight }]}>31</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "MON" ? Colors.dark : Colors.darkLight }]}>MON</Text>
                        </View>
                    </TouchableOpacity>





                </View>


            </View>
            {isActive === "SAT" && <MemoryByDay posts={monthDay29Posts} />}
            {isActive === "SUN" && <MemoryByDay posts={monthDay30Posts} />}
            {isActive === "MON" && <MemoryByDay posts={monthDay31Posts} />}
        </SafeAreaView>
    )
}

export default Memories5thWeek

const styles = StyleSheet.create({


    tabText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark, textAlign: 'center', fontWeight: "700" },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center" },
    tabBtn: { flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', width: "12.5%", marginHorizontal: '1%', },
    roundedDot: { width: 6, height: 6, backgroundColor: Colors.primary, borderRadius: 50 },
    tabBtnActive: { backgroundColor: Colors.primary, }



})
