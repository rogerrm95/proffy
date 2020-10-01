import React, { useState, useEffect, useContext } from 'react'

import { useNavigation } from '@react-navigation/native';
import { View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Fumi } from 'react-native-textinput-effects'

import { Feather } from '@expo/vector-icons'

import styles from './styles';
import api from '../../services/api';

const SignUp: React.FC = () => {

    useEffect(() => {
        if (name === '' || lastname === '' || email === '' || password === '') {
            setStateButton(false)
        } else {
            setStateButton(true)
        }
    })

    const { navigate } = useNavigation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')

    const [stateButton, setStateButton] = useState(false)

    function inviteForm() {

        api.post('/signup', {
            name, lastname, email, password
        })
            .then(function () {
                navigate('SuccessMessage', {
                    title: 'Cadastro Concluído!',
                    description: 'Agora você faz parte da plataforma da Proffy',
                    buttonText: 'Login'
                })
            })
            .catch(error => alert((error.response.data)))
    }

    function handleToSignIn() {
        navigate('SignIn')
    }

    return (

        <View style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={handleToSignIn}>
                    <Feather name='arrow-left' size={25} color={"#8257E5"} />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>

                <View>
                    <Text style={[styles.title, styles.textDefault]}>Crie sua conta gratuíta</Text>

                    <Text style={styles.subtitle}>
                        Basta Preencher esses dados e você estará conosco.
                    </Text>
                </View>

                <View>
                    <View style={styles.form}>

                        <Text style={[styles.textDefault, styles.titleForm]}>
                            Informe seus dados:
                        </Text>

                        <Fumi
                            label={'Nome'}
                            iconClass={Feather}
                            iconName={'user'}
                            iconColor={'#04D361'}
                            passiveIconColor={'#8257E5'}
                            iconSize={20}
                            onChangeText={text => setName(text)}
                            style={styles.inputs}
                        />

                        <Fumi
                            label={'Sobrenome'}
                            iconClass={Feather}
                            iconName={'user'}
                            iconColor={'#04D361'}
                            passiveIconColor={'#8257E5'}
                            iconSize={20}
                            onChangeText={text => setLastname(text)}
                            style={styles.inputs}
                        />

                        <Fumi
                            label={'E-Mail'}
                            iconClass={Feather}
                            iconName={'mail'}
                            iconColor={'#04D361'}
                            passiveIconColor={'#8257E5'}
                            iconSize={20}
                            onChangeText={text => setEmail(text)}
                            style={styles.inputs}
                        />

                        <Fumi
                            label={'Senha'}
                            iconClass={Feather}
                            iconName={'lock'}
                            iconColor={'#04D361'}
                            passiveIconColor={'#8257E5'}
                            iconSize={20}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                            style={styles.inputs}
                        />

                        <TouchableOpacity
                            style={[styles.nextButton,
                            stateButton ? styles.nextButtonActive : styles.nextButtonDisable]}
                            disabled={!stateButton}
                            activeOpacity={stateButton ? 0.4 : 1}
                            onPress={inviteForm}
                        >
                            <Text style={styles.nextButtonText}>Finalizar Cadastro</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </ScrollView>

        </View>
    )
}

export default SignUp;