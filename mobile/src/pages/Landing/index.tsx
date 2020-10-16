import React, { useState, useEffect, useContext } from 'react'
import { View, Image, Text, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler'
import * as SecureStore from 'expo-secure-store';

// Icons and Images //
import Icon from 'react-native-vector-icons/Feather'
import studyIcon from './../../assets/images/icons/study.png'
import giveClassesIcon from './../../assets/images/icons/give-classes.png'
import landingImage from './../../assets/images/landing.png'
import heartIcon from './../../assets/images/icons/heart.png'
import avatarDefault from './../../assets/images/user.png'

// Contexto e API//
import api from '../../services/api'
import AuthContext from '../../contexts/auth';

// Styles //
import styles from './styles';

// URL - Arquivos Estáticos //
const staticFileURL = 'http://192.168.15.2:8081/public'

interface DataStorage {
    avatar: string,
    name: string,
    lastname: string
}

function Landing() {

    const { navigate } = useNavigation()
    const context = useContext(AuthContext)

    const [totalConnections, setTotalConnections] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('') as any

    // Usado para incrementar +1 no total de conexões sempre que houver uma //
    useEffect(() => {
        api.get('connections').then(res => {

            const { total } = res.data

            setTotalConnections(total)
        })
            .catch(e => alert(e))
    })

    // Utilizado para capturar o nome e a foto do usuário //
    useEffect(() => {

        api.get('/perfil', { params: context.user })
            .then(res => {

                const data = res.data
                setName(`${data.name} ${data.lastname}`)
                setAvatar(data.avatar)
            })
            .catch(e => {
                alert(e)
            })
    }, [])

    function handleNavigateToGiveClassesPage() {
        navigate('Give-Classes')
    }

    function handleNavigateToStudyPage() {
        navigate('Study')
    }

    function handleNavigateToPerfilPage() {
        navigate('Perfil')
    }

    async function handleToLogout() {
        await SecureStore.deleteItemAsync('proffyUser')
        context.signIn(null)
    }

    return (
        <View style={styles.container}>

            <View style={styles.boxHeader}>

                <View style={styles.topbar}>

                    <TouchableHighlight
                        underlayColor="#774DD6"
                        activeOpacity={0.8}
                        onPress={handleNavigateToPerfilPage}
                        style={styles.buttonPerfil}>

                        <View style={styles.userPerfil}>
                            <Image
                                source={avatar ? { uri: `${staticFileURL}/${avatar}` } : avatarDefault}
                                style={styles.avatar} />

                            <Text style={styles.name}>{name}</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableOpacity style={styles.buttonLogout} onPress={handleToLogout}>
                        <Icon name='power' size={20} color={'#FFF'} />
                    </TouchableOpacity>
                </View>

                <Image source={landingImage} style={styles.banner} />
            </View>

            <View style={styles.boxContent}>
                <Text style={styles.title}>
                    Seja Bem-Vindo {'\n'}
                    <Text style={styles.titleBold}> O que deseja fazer? </Text>
                </Text>

                <View style={styles.buttonsContainers}>
                    <RectButton
                        style={[styles.button, styles.buttonPrimary]}
                        onPress={handleNavigateToStudyPage}
                    >
                        <Image source={studyIcon} />
                        <Text style={styles.buttonText}>Estudar</Text>
                    </RectButton>

                    <RectButton
                        onPress={handleNavigateToGiveClassesPage}
                        style={[styles.button, styles.buttonSecondary]}
                    >
                        <Image source={giveClassesIcon} />
                        <Text style={styles.buttonText}>Dar Aulas</Text>
                    </RectButton>
                </View>

                <Text style={styles.totalConnections}>
                    Total de {totalConnections} Conexões já realizadas {" "}
                    <Image source={heartIcon} />
                </Text>
            </View>
        </View>
    )
}

export default Landing;