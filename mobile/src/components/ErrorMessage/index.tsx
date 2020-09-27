import React from 'react'
import { View, Text } from 'react-native';

// Icones //
import Icon from 'react-native-vector-icons/Feather'

// Estilos //
import styles from './styles'

interface ErrorMessageProps {
    text: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
    return (
        <View style={styles.errorMessageBox}>

            <Icon name='alert-triangle' size={40} color={'#FFF'} />

            <Text style={styles.errorMessage}> {text} </Text>
            
        </View>
    )
}

export default ErrorMessage;