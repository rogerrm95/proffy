import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, } from 'react-native';

// Image-Picker //
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Constants from 'expo-constants'

// Ícones e Imagens //
import Icon from 'react-native-vector-icons/Feather'
import avatarDefault from './../../assets/images/user.png'
import backgroundSelectPhoto from './../../assets/images/background-select-photo.png'

// Estilos //
import styles from './styles'

interface SelectPictureProps {
    avatar: string,
    handleToVisible: (value: boolean) => void,
    onPhotoChange: (avatar: string, isURL?: boolean) => void,
}

const SelectPicture: React.FC<SelectPictureProps> = ({ avatar, handleToVisible, onPhotoChange, children }) => {

    const [image, setImage] = useState(avatar)

    const [url, setURL] = useState('')
    const [showInput, setShowInput] = useState(false)

    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        (async () => {
            if (Constants.platform?.OS !== 'web') {
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
                    <TouchableOpacity style={[styles.buttonAction, styles.buttonSave]} onPress={() => {
                        onPhotoChange(image)
                        handleToVisible(false)
                    }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Salvar</Text>
                        <Icon name="save" size={22} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonAction, styles.buttonDelete]} onPress={() => {
                        onPhotoChange('')
                        setImage('')
                    }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Excluir</Text>
                        <Icon name="trash-2" size={22} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonAction, styles.buttonClose]} onPress={() => { handleToVisible(false) }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Fechar</Text>
                        <Icon name="x" size={22} color="#FFF" />
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView >
    )
}

export default SelectPicture;