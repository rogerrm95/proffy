import React from 'react'

import { View, Text, Image, TouchableOpacity } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

// Ícones e Imagens //
import Icon from 'react-native-vector-icons/Feather'
import avatarDefault from './../../assets/images/user.png'

// Estilos //
import styles from './styles'

interface SelectPictureProps {
    avatar: string
}

const SelectPicture: React.FC<SelectPictureProps> = ({ avatar, children }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>

                <View style={styles.imageBox}>
                    <Image source={avatar ? avatar : avatarDefault} style={styles.image}/>
                </View>

                <View style={styles.buttonSelectPictureGroup}>
                    <TouchableOpacity style={styles.buttonSelectPicture} onPress={() => { }}>
                        <Icon name="camera" size={55} color="#FFF" />
                        <Text style={styles.buttonText}>Tirar Foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSelectPicture} onPress={() => { }}>
                        <Icon name="image" size={55} color="#FFF" />
                        <Text style={styles.buttonText}>Escolher do Álbum</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonSelectPicture} onPress={() => { }}>
                        <Icon name="link" size={55} color="#FFF" />
                        <Text style={styles.buttonText}>Inserir URL</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonActionsGroup}>
                    <TouchableOpacity style={[styles.buttonAction, styles.buttonSave]} onPress={() => { }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Salvar</Text>
                        <Icon name="save" size={18} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonAction, styles.buttonDelete]} onPress={() => { }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Excluir</Text>
                        <Icon name="trash-2" size={18} color="#FFF" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonAction, styles.buttonClose]} onPress={() => { }}>
                        <Text style={[styles.buttonText, { marginRight: 5 }]}>Fechar</Text>
                        <Icon name="x" size={18} color="#FFF" />
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

export default SelectPicture;