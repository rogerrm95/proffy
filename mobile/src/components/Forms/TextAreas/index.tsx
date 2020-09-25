import React from 'react'
import { View, Text, TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Estilos //
import styles from './styles'

interface TextAreaProps extends TextInputProps {
    label: string,
    height?: number,
    width?: number
}

const TextAreas: React.FC<TextAreaProps> = ({ label, height, width, ...rest }) => {

    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>

            <TextInput style={[styles.input, {
                height: height ? height : 'auto',
                width: width ? width : 'auto'
            }
            ]} {...rest} />

        </View>
    )
}

export default TextAreas;