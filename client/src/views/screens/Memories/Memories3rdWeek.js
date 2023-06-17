import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../../constants/Colors'
import Fonts from '../../../constants/Fonts'

import MemoryByDay from './MemoryByDay'

const Memories3rdWeek = ({ monthDay15Posts, monthDay16Posts, monthDay17Posts, monthDay18Posts, monthDay19Posts, monthDay20Posts, monthDay21Posts }) => {

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
                            <Text style={[styles.tabText, { color: isActive === "SAT" ? Colors.dark : Colors.darkLight }]}>15</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "SAT" ? Colors.dark : Colors.darkLight }]}>SAT</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("SUN")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "SUN" ? Colors.dark : Colors.darkLight }]}>16</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "SUN" ? Colors.dark : Colors.darkLight }]}>SUN</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("MON")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "MON" ? Colors.dark : Colors.darkLight }]}>17</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "MON" ? Colors.dark : Colors.darkLight }]}>MON</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("TUE")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "TUE" ? Colors.dark : Colors.darkLight }]}>18</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "TUE" ? Colors.dark : Colors.darkLight }]}>TUE</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("WED")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "WED" ? Colors.dark : Colors.darkLight }]}>19</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "WED" ? Colors.dark : Colors.darkLight }]}>WED</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("THU")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "THU" ? Colors.dark : Colors.darkLight }]}>20</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "THU" ? Colors.dark : Colors.darkLight }]}>THU</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabBtn} onPress={() => setStatusFilter("FRI")}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[styles.tabText, { color: isActive === "FRI" ? Colors.dark : Colors.darkLight }]}>21</Text>
                            <Text style={styles.roundedDot}></Text>
                            <Text style={[styles.tabText, { color: isActive === "FRI" ? Colors.dark : Colors.darkLight }]}>FRI</Text>
                        </View>
                    </TouchableOpacity>



                </View>


            </View>
            {isActive === "SAT" && <MemoryByDay posts={monthDay15Posts} />}
            {isActive === "SUN" && <MemoryByDay posts={monthDay16Posts} />}
            {isActive === "MON" && <MemoryByDay posts={monthDay17Posts} />}
            {isActive === "TUE" && <MemoryByDay posts={monthDay18Posts} />}
            {isActive === "WED" && <MemoryByDay posts={monthDay19Posts} />}
            {isActive === "THU" && <MemoryByDay posts={monthDay20Posts} />}
            {isActive === "FRI" && <MemoryByDay posts={monthDay21Posts} />}
        </SafeAreaView>
    )
}

export default Memories3rdWeek

const styles = StyleSheet.create({


    tabText: { fontFamily: Fonts.primary, fontSize: 10, color: Colors.dark, textAlign: 'center', fontWeight: "700" },

    tabContainer: { width: "100%", alignItems: "center", justifyContent: "center" },
    tabBtn: { flexDirection: 'row', paddingVertical: 10, justifyContent: 'center', width: "12.5%", marginHorizontal: '1%', },
    roundedDot: { width: 6, height: 6, backgroundColor: Colors.primary, borderRadius: 50 },
    tabBtnActive: { backgroundColor: Colors.primary, }



})
