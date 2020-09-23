import React from 'react'

import { View, Text, Image } from 'react-native';

// Ícones e Imagens //
import imageBackground from './../../assets/images/give-classes-background.png'
import logoImage from './../../assets/images/logo.png'

// Estilos //
import styles from './styles'

const SignInHeader: React.FC = () => {
    return (
        <View style={styles.header}>
            <Image
                source={logoImage}
                style={styles.logo}
                resizeMode='contain'
            />
            <Text style={styles.logoText}>
                Sua Plataforma de Estudos Online.
        </Text>
        </View>
    )
}

export default SignInHeader;