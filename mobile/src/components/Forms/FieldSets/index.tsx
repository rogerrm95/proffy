import React from 'react'
import { View, Text } from 'react-native'

// Estilos //
import styles from './styles'

interface FieldSetsProps {
    label: string
}

const FieldSets: React.FC<FieldSetsProps> = ({ label, children }) => {
    return (
        <View style={styles.container}>

            <Text style={styles.label}>{label}</Text>   

            {children}   

        </View>
    )
}

export default FieldSets;