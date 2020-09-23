import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

// Icons and Images //
import heartIcon from './../../assets/images/icons/heart.png'
import unfavoriteIcon from './../../assets/images/icons/unfavorite.png'
import whatsappIcon from './../../assets/images/icons/whatsapp.png'

// Styles //
import styles from './styles';

// API //
import api from '../../services/api';

export interface Teacher {
    name: string,
    bio: string,
    avatar: string,
    whatsapp: string,
    subject: string,
    cost: number,
    id: number
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited)

    function handleLinkToWhatsapp() {

        api.post('connections', { user_id: teacher.id })

        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`)
    }

    async function handleToggleFavorite() {

        const favorites = await AsyncStorage.getItem('favorites');

        let favoritesArray = []

        if (favorites) {
            favoritesArray = JSON.parse(favorites)
        }

        if (isFavorited) {
            // Remove da lista
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id
            })

            favoritesArray.splice(favoriteIndex, 1)

            setIsFavorited(false)

        } else {
            // Adiciona na lista
            favoritesArray.push(teacher)


            setIsFavorited(true)
        }

        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray))
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    source={{ uri: `${teacher.avatar}` }}
                    style={styles.avatar}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}> {teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.footer}>
                <Text style={styles.cost}>
                    Preço/Hora: {'  '}
                    <Text style={styles.costValue}>{teacher.cost}</Text>
                </Text>

                <View style={styles.containerButtons}>
                    <RectButton
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                        onPress={handleToggleFavorite}>

                        { isFavorited ?
                            <Image source={unfavoriteIcon} /> :
                            <Image source={heartIcon} />
                        }
                    </RectButton>

                    <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em Contato</Text>
                    </RectButton>
                </View>

            </View>

        </View>
    )
};

export default TeacherItem;