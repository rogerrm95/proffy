import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, Text, KeyboardAvoidingView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// Input de terceiros //
import { Fumi } from 'react-native-textinput-effects';

// Componentes //
import SignInHeader from '../../components/SignInHeader';
import ErrorMessage from '../../components/ErrorMessage';

// Icones //
import { Feather } from '@expo/vector-icons'

// Schema e API //
import Schema from './schema';
import api from '../../services/api';

// Estilos //
import styles from './styles'

const ForgotPassword: React.FC = () => {

    const { navigate, goBack } = useNavigation()

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)
    const [email, setEmail] = useState('')
    
    // Botão fica inativo enquanto o campo e-mail estiver limpo //
    useEffect(() => {
        if (email === '') {
            setIsCompleted(false)
        } else {
            setIsCompleted(true)
        }
    })

    function handleToInviteEmail() {

        Schema.validate({ email })
            .then(_ => {
                api.post('forgot-pass', { email })
                    .then(_ => {
                        navigate('SuccessMessage', {
                            title: 'Redefinição enviada!',
                            description: 'Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos',
                            buttonText: 'Login'
                        })
                    })
                    .catch(e => {
                        setShowMessage(true)
                        setMessage(e.response.data)

                        setTimeout(() => {
                            setShowMessage(false)
                        }, 6000)
                    })
            })
            .catch(e => {

                // Exibirá um aviso caso a validação falhe //
                setShowMessage(true)
                setMessage(e.errors)

                setTimeout(() => {
                    setShowMessage(false)
                }, 6000)
            })
    }

    return (
        <View style={styles.container}>
            <SignInHeader />

            <ScrollView style={{ margin: 5 }}>

                <KeyboardAvoidingView behavior='padding'>


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
                            iconClass={Feather}
                            iconName={'mail'}
                            passiveIconColor={'#8257E5'}
                            onChangeText={text => setEmail(text)}
                            textContentType={'emailAddress'}
                        />

                        <TouchableOpacity
                            style={[styles.inviteButton,
                            isCompleted ? styles.inviteButtonActive : styles.inviteButtonDisable]}
                            disabled={!isCompleted}
                            onPress={handleToInviteEmail}>
                            <Text style={styles.inviteButtonText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>

                </KeyboardAvoidingView>

            </ScrollView>

            {
                showMessage ? <ErrorMessage text={message} /> : null
            }

        </View>
    )
}

export default ForgotPassword;