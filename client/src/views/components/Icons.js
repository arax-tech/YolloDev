
import React from 'react'

import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Zocial from 'react-native-vector-icons/Zocial';

const IconFontisto = ({ name, size, color, style }) => {
    return <Fontisto name={name} size={size} color={color} style={style} />
}

const IconIonicons = ({ name, size, color, style }) => {
    return <Ionicons name={name} size={size} color={color} style={style} />
}

const IconFeather = ({ name, size, color, style }) => {
    return <Feather name={name} size={size} color={color} style={style} />
}
const IconSimpleLineIcons = ({ name, size, color, style }) => {
    return <SimpleLineIcons name={name} size={size} color={color} style={style} />
}
const IconAntDesign = ({ name, size, color, style }) => {
    return <AntDesign name={name} size={size} color={color} style={style} />
}

const IconFontAwesome = ({ name, size, color, style }) => {
    return <FontAwesome name={name} size={size} color={color} style={style} />
}

const IconFontAwesome5 = ({ name, size, color, style }) => {
    return <FontAwesome5 name={name} size={size} color={color} style={style} />
}
const IconEntypo = ({ name, size, color, style }) => {
    return <Entypo name={name} size={size} color={color} style={style} />
}

const IconOcticons = ({ name, size, color, style }) => {
    return <Octicons name={name} size={size} color={color} style={style} />
}

const IconMaterialCommunityIcons = ({ name, size, color, style }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
}
const IconMaterialIcons = ({ name, size, color, style }) => {
    return <MaterialIcons name={name} size={size} color={color} style={style} />
}
const IconEvilIcons = ({ name, size, color, style }) => {
    return <EvilIcons name={name} size={size} color={color} style={style} />
}

const IconFoundation = ({ name, size, color, style }) => {
    return <Foundation name={name} size={size} color={color} style={style} />
}
const IconZocial = ({ name, size, color, style }) => {
    return <Zocial name={name} size={size} color={color} style={style} />
}


export { IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial }
