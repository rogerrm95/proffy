import React, { useContext } from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons and Images //
import Icon from 'react-native-vector-icons/Feather'
import backgroundSuccess from './../../assets/images/backgroundSuccess.png'

// Contexto //
import AuthContext from '../../contexts/auth';

import styles from './styles'


const SuccessMessage: React.FC = () => {

    const { navigate } = useNavigation()
    const { signed } = useContext(AuthContext)

    const { params }: any = useRoute()

    function handleToHome() {
        signed ? navigate('Landing') : navigate('SignIn')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={backgroundSuccess}
                style={styles.content}
                resizeMode='contain'>

                <Text style={styles.title}>
                    {params.title}
                </Text>

                <Text style={styles.description}>
                    {params.description}
                </Text>
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleToHome}>

                <Icon name='home' size={30} color="#FFF" style={styles.iconHome} />
                <Text style={styles.okText}>
                    {params.buttonText}
                </Text>

            </RectButton>
        </View>
    )
}

export default SuccessMessage;