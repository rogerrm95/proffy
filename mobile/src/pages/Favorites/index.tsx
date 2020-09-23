import React, { useState } from 'react'
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

// Components //
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

// Styles //
import styles from './styles';

function Favorites() {

    const [favorites, setFavorites] = useState([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachers)
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    )

    return (
        <View style={styles.container}>
            <PageHeader title='Meus Proffys favoritos'></PageHeader>

            <ScrollView style={styles.teacherList} contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 16
            }}>
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited />
                    )
                })}
            </ScrollView>

        </View>
    )
}

export default Favorites;