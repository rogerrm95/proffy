import React, { useState, useEffect, useContext } from 'react'
import { View, Image, Text, CheckBox } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';

// Componentes //
import SignInHeader from './../../components/SignInHeader'
import ErrorMessage from '../../components/ErrorMessage';

// Contexto //
import AuthContext from './../../contexts/auth'

// API //
import api from '../../services/api'

// Ícones e Imagens //
import { Feather } from '@expo/vector-icons'

// Estilo //
import styles from './styles'
import Schema from './schema';

const SignIn: React.FC = () => {

    const { signed, signIn, user } = useContext(AuthContext)

    const { navigate } = useNavigation()

    const [isButtonDisable, setIsButtonDisable] = useState(true)
    const [hidePassword, setHidePassword] = useState(true)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        toggleButtonState()
    })

    function toggleHidePassword() {
        setHidePassword(!hidePassword)
    }

    function toggleButtonState() {
        if (email === '' || password === '') {
            setIsButtonDisable(true)
        } else {
            setIsButtonDisable(false)
        }
    }

    function handleSignIn() {

        Schema.validate({ email, password })
            .then(_ => {
                api.post('/signin', { email, password })
                    .then(async (res) => {

                        const userData = JSON.stringify(res.data)

                        await SecureStore.setItemAsync('proffyUser', userData)

                        signIn(res.data)
                    })
                    .catch(e => {

                        // Exibirá um aviso caso a validação falhe //
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

    function handleToSignUp() {
        navigate('SignUp')
    }

    function handleToForgotPassword() {
        navigate('ForgotPassword')
    }

    return (
        <View style={styles.container}>

            <SignInHeader />

            <View style={styles.login}>

                <View style={styles.loginForms}>

                    <View style={styles.elements}>
                        <Text style={styles.loginText}>Fazer Login</Text>

                        <TouchableOpacity style={{ padding: 8 }} onPress={handleToSignUp}>
                            <Text style={styles.createAccount}>Criar uma conta</Text>
                        </TouchableOpacity>

                    </View>

                    <TextInput
                        placeholder="E-Mail"
                        style={styles.inputs}
                        onChangeText={text => setEmail(text)}
                    />

                    <View style={[styles.inputPasswordBox, styles.inputs]}>
                        <TextInput
                            placeholder='Senha'
                            style={styles.inputPassword}
                            secureTextEntry={hidePassword}
                            onChangeText={text => setPassword(text)}
                        />
                        <TouchableOpacity onPress={toggleHidePassword} style={styles.toggleHidePassword}>
                            <Feather
                                name={hidePassword ? 'eye' : 'eye-off'}
                                size={22}
                                color={hidePassword ? "#0d0" : '#774DD6'}
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.elements}>
                        <View style={styles.checkboxContent}>
                            <CheckBox />
                            <Text style={styles.checkboxText}>Lembrar-me</Text>
                        </View>

                        <TouchableOpacity onPress={handleToForgotPassword}>
                            <Text style={styles.forgotPasswordText}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.loginButton, isButtonDisable ? styles.inativeButton : styles.activeButton]}
                        disabled={isButtonDisable}
                        onPress={handleSignIn}>

                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {
                showMessage ? <ErrorMessage text={message} /> : null
            }

        </View>
    )
}

export default SignIn;