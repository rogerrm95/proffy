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
import userDefault from './../../assets/images/user.png'

// Contexto e API//
import api from '../../services/api'
import AuthContext from '../../contexts/auth';

// Styles //
import styles from './styles';

interface DataStorage{
    avatar: string,
    name: string,
    lastname: string
}

function Landing() {

    const { navigate } = useNavigation()
    const { signIn } = useContext(AuthContext)
    
    const [totalConnections, setTotalConnections] = useState(0)
    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    
    // Usado para incrementar +1 no total de conexões sempre que houver uma //
    useEffect(() => {
        api.get('connections').then(res => {

            const { total } = res.data

            setTotalConnections(total)
        })
            .catch(e => alert(e))
    })
   
    // Utilizado para capturar o nome e a foto do usuário vindo da SecureStorage //
    useEffect(() => {

        async function getStorage() {
            const storage = await SecureStore.getItemAsync('proffyUser') as string
            const data = JSON.parse(storage) as DataStorage

            setName(`${data.name} ${data.lastname}`)
            setAvatar(data.avatar)
        }

        getStorage()
    }, [])

    function handleNavigateToGiveClassesPage() {
        navigate('Give-Classes')
    }

    function handleNavigateToStudyPages() {
        navigate('Study')
    }

    async function handleToLogout() {
        await SecureStore.deleteItemAsync('proffyUser')
        signIn(null)
    }

    return (
        <View style={styles.container}>

            <View style={styles.boxHeader}>

                <View style={styles.topbar}>

                    <TouchableHighlight
                        underlayColor="#774DD6"
                        activeOpacity={0.8}
                        onPress={() => alert('Pressed!')}
                        style={styles.buttonPerfil}>

                        <View style={styles.userPerfil}>
                            <Image
                                source={avatar !== '' ? {uri: avatar} : userDefault}
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
                        onPress={handleNavigateToStudyPages}
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