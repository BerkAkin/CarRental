import React from 'react';
import { View } from 'react-native';
import { Ionicons  } from '@expo/vector-icons';

function Icon({ name, size, color }) {
    return (
        <View>
            <Ionicons  name={name} size={size} color={color} />
        </View>
    );
}

export default Icon;
