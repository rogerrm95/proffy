import React, { useState } from 'react'
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

// Components //
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

// Icons //
import { Feather } from '@expo/vector-icons'

// Styles //
import styles from './styles';

// API //
import api from '../../services/api';


function TeacherList() {

    // ESTADOS //
    const [isFilterVisible, setIsFiltersVisible] = useState(false)
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('')
    const [time, setTime] = useState('')
    const [teachers, setTeachers] = useState([])
    const [favorites, setFavorites] = useState<number[]>([])

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id
                })

                setFavorites(favoritedTeachersIds)
            }
        })
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setTeachers(response.data)
        setIsFiltersVisible(false)
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFilterVisible)
    }

    return (
        <View style={styles.container}>

            <PageHeader
                title='Proffys Disponíveis'
                labelTop='Estudar'
                headerButton={
                    <View style={styles.filter}>
                        <BorderlessButton onPress={handleToggleFiltersVisible} style={styles.filterButton}>
                            <Feather name='filter' size={20} color='#04D361' />
                            <Text style={styles.filterText}>Filtrar por dia, hora e matéria</Text>
                            <Feather name='chevron-down' size={20} color='#A380F6' />
                        </BorderlessButton>
                    </View>
                }>

                {isFilterVisible && (

                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#c1bccc"
                        />

                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da Semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    onChangeText={text => setWeekDay(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                />
                            </View>

                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />)
                })}

            </ScrollView>

        </View>
    )
}

export default TeacherList; 