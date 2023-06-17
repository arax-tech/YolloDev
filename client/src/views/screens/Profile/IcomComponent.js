import React from 'react'

import { IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial } from '../../components/Icons'

const components = {
    IconFontisto, IconIonicons, IconFeather, IconSimpleLineIcons, IconAntDesign, IconFontAwesome, IconFontAwesome5, IconEntypo, IconOcticons, IconMaterialIcons, IconMaterialCommunityIcons, IconEvilIcons, IconFoundation, IconZocial,
}

const IcomComponent = ({ type, name, size, color }) => {
    const SpecificIcon = components[type]
    return (
        <SpecificIcon name={name} size={size} color={color} style={{ marginRight: 3 }} />
    )
}

export default IcomComponent