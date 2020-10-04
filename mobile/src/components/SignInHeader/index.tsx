import React from 'react'

import { View, Text, Image, ImageBackground } from 'react-native';

// Ícones e Imagens //
import imageBackground from './../../assets/images/login-logo.png'

// Estilos //
import styles from './styles'

const SignInHeader: React.FC = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={imageBackground} resizeMode='stretch' style={styles.logo}/>
        </View>
    )
}

export default SignInHeader;