import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, } from 'react-native';
import * as SecureStorage from 'expo-secure-store'

// Image-Picker //
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

// Ícones e Imagens //
import Icon from 'react-native-vector-icons/Feather'
import avatarDefault from './../../assets/images/user.png'
import backgroundSelectPhoto from './../../assets/images/background-select-photo.png'

// API e Contexto //
import api from '../../services/api';
import AuthContext, { User } from '../../contexts/auth';

// Estilos //
import styles from './styles'

// URL - Arquivos Estáticos //
const staticFileURL = 'http://192.168.15.2:8081/public'

interface SelectPictureProps {
    avatar: string,
    handleToVisible: (value: boolean) => void,
    onPhotoChange: (avatar: string | null) => void,
}

const SelectPicture: React.FC<SelectPictureProps> = ({ avatar, handleToVisible, onPhotoChange, children }) => {

    const context = useContext(AuthContext)

    const [image, setImage] = useState("") as any
    const [file, setFile] = useState('') as any
    const [hasImageSelected, setHasImageSelected] = useState(false)

    // Carrega a imagem passada como prop //
    useEffect(() => {
        avatar ? setImage(`${staticFileURL}/${avatar}`) : null
    }, [])

    // Solicita as permissões de acesso ao usuário //
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();

                if (status !== 'granted') {
                    alert('Lamento, nós precisamos destas permissões para prosseguir');
                }
            }
        })();
    }, [])

    // Acessa a Galeria do Usuário //
    async function openGallery() {

        const data = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })

        if (data.cancelled) {
            return
        }

        if (!data.uri) {
            return
        }

        setImage(data.uri)
        setFile(data)
        setHasImageSelected(true)
    }

    // Acessa a Câmera do Usuário //
    async function openCamera() {

        const data = await ImagePicker.launchCameraAsync({})

        if (data.cancelled) {
            return
        }

        if (!data.uri) {
            return
        }

        setImage(data.uri)
        setFile(data)
        setHasImageSelected(true)
    }

    function savePhoto() {

        if (image) {
            const formData = new FormData()
            const { email } = context.user as User

            const image = {
                uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
                type: 'image/jpeg',
                name: file.uri.split('/').pop()
            } as any

            formData.append('file', image)
            formData.append('email', email)

            api.post('/upload', formData)
                .then(async (res) => {
                    onPhotoChange(res.data)
                    handleToVisible(false)
                })
                .catch(e => {
                    alert(e)
                })
        } else {
            onPhotoChange(null)
            handleToVisible(false)
        }
    }

    function deletePhoto() {

        if (image) {
            const { email } = context.user as User

            api.delete('/upload', {
                params: { email, image }
            })
                .then(res => {
                    onPhotoChange('')
                    handleToVisible(false)
                })
                .catch(e => {
                    alert(e.response.data)
                })
        } else {
            alert('Não há foto para excluir')
        }

    }

    function clearPhoto() {
        setImage('')
        setHasImageSelected(false)
    }

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Foto de Perfil</Text>

                <View style={[styles.imageBox, image ? styles.photoSelected : {}]}>
                    <Image source={image ? { uri: image } : avatarDefault} style={styles.image} />
                </View>

                <View style={styles.buttonSelectPictureGroup}>
                    <TouchableOpacity style={styles.buttonSelectPicture} onPress={openCamera}>
                        <Icon name="camera" size={55} color="#FFF" />
                        <Text style={styles.buttonText}>Câmera</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSelectPicture} onPress={openGallery}>
                        <Icon name="image" size={55} color="#FFF" />
                        <Text style={styles.buttonText}>Galeria</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonActionsGroup}>
                    <TouchableOpacity
                        style={[styles.buttonAction, styles.buttonSave, !image ? styles.disabled : {}]}
                        onPress={savePhoto}
                        disabled={!image}
                    >

                        <Text style={[styles.buttonText, { marginRight: 5 }]}>
                            Salvar
                        </Text>
                        <Icon name="thumbs-up" size={22} color="#FFF" />
                    </TouchableOpacity>

                    {
                        hasImageSelected ?

                            <TouchableOpacity
                                style={[styles.buttonAction, styles.buttonClear]}
                                onPress={clearPhoto}>
                                <Text style={[styles.buttonText, { marginRight: 5 }]}>
                                    Limpar
                                </Text>
                                <Icon name="thumbs-down" size={22} color="#FFF" />
                            </TouchableOpacity>

                            :

                            <TouchableOpacity
                                style={[styles.buttonAction, styles.buttonDelete, !image ? styles.disabled : {}]}
                                onPress={deletePhoto}
                                disabled={!image ? true : false}>
                                <Text style={[styles.buttonText, { marginRight: 5 }]}>
                                    Excluir
                            </Text>
                                <Icon name="trash-2" size={22} color="#FFF" />
                            </TouchableOpacity>
                    }

                    <TouchableOpacity style={[styles.buttonAction, styles.buttonClose]} onPress={() => { handleToVisible(false) }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>
                            Fechar
                        </Text>
                        <Icon name="x" size={22} color="#FFF" />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView >
    )
}

export default SelectPicture;