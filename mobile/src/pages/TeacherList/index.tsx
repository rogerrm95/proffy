import React, { useState } from 'react'
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

// Components //
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Inputs from '../../components/Forms/Inputs';
import Select from '../../components/Forms/Select';

// Icons //
import { Feather } from '@expo/vector-icons/'

// Styles //
import styles from './styles';

// API //
import api from '../../services/api';

// Utilidades //
import { subjectsList, weekDayList } from './../../utils/subjectsList'

function TeacherList() {

    const [isFilterVisible, setIsFiltersVisible] = useState(false)
    const [subject, setSubject] = useState('Artes')
    const [week_day, setWeekDay] = useState('Domingo')
    const [week_dayIndex, setWeekDayIndex] = useState(0)
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

        try {
            const response = await api.get('classes', {
                params: {
                    subject,
                    week_day: week_dayIndex,
                    time
                }
            })

            setTeachers(response.data)
            setIsFiltersVisible(false)
        } catch (e) {
            alert(e.response.data)
        }
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

                        <Select
                            label="Matéria"
                            options={subjectsList}
                            labelStyle={{ colorText: '#D4C2FF', fontSize: 16 }}
                            selectStyle={{ backgroundColor: '#fff' }}
                            selectedValue={subject}
                            onValueChange={((text: any, index) => setSubject(text))}
                        />

                        <View style={styles.inputGroup}>

                            <View style={styles.inputBlock}>
                                <Select
                                    label="Dia da Semana"
                                    options={weekDayList}
                                    labelStyle={{ colorText: '#D4C2FF', fontSize: 16 }}
                                    selectStyle={{ backgroundColor: '#fff', height: 52 }}
                                    selectedValue={week_day}
                                    onValueChange={((text, index) => {
                                        setWeekDay(text)
                                        setWeekDayIndex(index)
                                    })}
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Inputs
                                    label="Horário"
                                    placeholder="00:00*"
                                    labelStyle={{ colorText: '#D4C2FF', fontSize: 16 }}
                                    inputStyle={{ backgroundColor: '#FFF', height: 52 }}
                                    value={time}
                                    onChangeText={(text) => setTime(text)} />
                            </View>

                        </View>

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Feather name='search' size={20} color='#FFF' />
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