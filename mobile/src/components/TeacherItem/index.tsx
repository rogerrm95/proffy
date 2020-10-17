import React, { useState } from 'react'
import { View, Text, Image, Linking } from 'react-native'
import { RectButton, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

// Icons and Images //
import heartIcon from './../../assets/images/icons/heart.png'
import unfavoriteIcon from './../../assets/images/icons/unfavorite.png'
import whatsappIcon from './../../assets/images/icons/whatsapp.png'
import avatarDefault from './../../assets/images/user.png'

// Componente //
import DayOfWeekItem, { DayOfWeekItemProps } from './../DayOfWeekItem';

// API //
import api from '../../services/api';

// utils //
import { weekDayList } from './../../utils/subjectsList'

// Styles //
import styles from './styles';

export interface Teacher {
    id: number,
    name: string,
    bio: string,
    avatar: string,
    whatsapp: string,
    subject: string,
    cost: number,
    times: Array<object>
}

interface TeacherItemProps {
    teacher: Teacher,
    favorited: boolean
}

// URL - Arquivos Estáticos //
const staticFileURL = 'http://192.168.15.28:8081/public'

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {

    const [isFavorited, setIsFavorited] = useState(favorited)

    const times = teacher.times as Array<any>

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
                    source={teacher.avatar ? { uri: `${staticFileURL}/${teacher.avatar}` } : avatarDefault}
                    style={styles.avatar}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}> {teacher.name}</Text>
                    <Text style={styles.subject}>{teacher.subject}</Text>
                </View>
            </View>

            <Text style={styles.bio}>{teacher.bio}</Text>

            <View style={styles.dayAndTime}>
                <Text style={styles.dayAndTimeText}>Dia</Text>
                <Text style={styles.dayAndTimeText}>Horário</Text>
            </View>

            <ScrollView style={styles.scrollweekDay}>

                {
                    weekDayList.map((week: string, index) => {

                        let item;
                        const arrayOfTime = [] as Array<any>

                        times.map((time: DayOfWeekItemProps) => {

                            if (time.week_day === index) {
                                const item = `${time.from}h - ${time.to}h`

                                arrayOfTime.push(item)
                            }

                            return item = <DayOfWeekItem keys={index} times={arrayOfTime} week={week} key={index} />
                        })

                        return item
                    })
                }
            </ScrollView>


            <View style={styles.footer}>
                <Text style={styles.cost}>
                    Preço por hora: {'      '}
                    <Text style={styles.costValue}>{`R$ ${teacher.cost} reais`}</Text>
                </Text>

                <View style={styles.containerButtons}>
                    <RectButton
                        style={[
                            styles.favoriteButton,
                            isFavorited ? styles.favorited : {}
                        ]}
                        onPress={handleToggleFavorite}>

                        {isFavorited ?
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