import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

// Icons and Images //
import giveClassesBackground from '../../assets/images/give-classes-background.png'

import styles from './styles'


const SuccessMessage: React.FC = () => {

    const { navigate } = useNavigation()
    const { params }: any = useRoute()

    function handleToLandingPage() {
        navigate('SignIn')
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={giveClassesBackground}
                style={styles.content}
                resizeMode='contain'
            >
                <Text style={styles.title}>{params.title}</Text>
                <Text style={styles.description}>
                    {params.description}
                </Text>
            </ImageBackground>

            <RectButton style={styles.okButton} onPress={handleToLandingPage}>
                <Text style={styles.okText}>Fazer Login</Text>
            </RectButton>

        </View>
    )
}

export default SuccessMessage;