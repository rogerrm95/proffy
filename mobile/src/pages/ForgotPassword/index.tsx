import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Fumi } from 'react-native-textinput-effects';
import { useNavigation } from '@react-navigation/native';

import SignInHeader from '../../components/SignInHeader';

import { Feather } from '@expo/vector-icons'

import styles from './styles'

const ForgotPassword: React.FC = () => {

    useEffect(() => {
        if (email === '') {
            setIsCompleted(false)
        } else {
            setIsCompleted(true)
        }
    })

    const { navigate, goBack } = useNavigation()

    const [isCompleted, setIsCompleted] = useState(false)
    const [warningLabel, setWarningLabel] = useState(false)
    const [email, setEmail] = useState('')

    function handleToInviteEmail() {

        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i // Validar Email //

        if (!email.match(regex)) {
            alert('E-Mail Inválido...')
            setWarningLabel(true)
        } else {
            navigate('SuccessMessage', {
                title: 'Redefinição enviada!',
                description: 'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos'
            })
        }
    }

    return (
        <View style={styles.container}>
            <SignInHeader />

            <View style={styles.body}>
                <TouchableOpacity
                    onPress={(() => goBack())}
                    style={styles.backIcon}>
                    <Feather name='arrow-left' size={30} color={"#8257E5"} />
                </TouchableOpacity>

                <Text style={styles.title}>Esqueceu sua senha ?</Text>
                <Text style={styles.description}>Não esquenta, vamos dar um jeito nisso.</Text>

                <Fumi
                    label={"E-Mail"}
                    labelStyle={warningLabel ? styles.warningText :  null}
                    iconClass={Feather}
                    iconName={'mail'}
                    iconColor={warningLabel ? "#F00": "#04D361"}
                    passiveIconColor={'#8257E5'}
                    onChangeText={text => setEmail(text)}
                    textContentType={'emailAddress'}
                    style={warningLabel ? styles.warningLabel :  null}
                />

                <TouchableOpacity
                    style={[styles.inviteButton,
                    isCompleted ? styles.inviteButtonActive : styles.inviteButtonDisable]}
                    disabled={!isCompleted}
                    onPress={handleToInviteEmail}>
                    <Text style={styles.inviteButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ForgotPassword;