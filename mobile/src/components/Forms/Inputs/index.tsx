import React from 'react'
import { View, Text, TextInputProps } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

// Estilos //
import styles from './styles'

interface InputsProps extends TextInputProps {
    label: string
}

const Inputs: React.FC<InputsProps> = ({ label, ...rest }) => {
    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>

            <TextInput style={styles.input}{...rest} />
            
        </View>
    )
}

export default Inputs;