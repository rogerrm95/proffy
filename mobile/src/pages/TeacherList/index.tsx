import React, { useState } from 'react'
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'

// Components //
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Inputs from '../../components/Forms/Inputs';
import Select from '../../components/Forms/Select';
import ErrorMessage from '../../components/ErrorMessage';

// Icons //
import Icon from 'react-native-vector-icons/Feather'

// Styles //
import styles from './styles';

// API e Schema(Validações)//
import api from '../../services/api';
import Schema from './schema';

// Utilidades //
import { subjectsList, weekDayList } from './../../utils/subjectsList'

function TeacherList() {

    const [isFilterVisible, setIsFiltersVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [showMessage, setShowMessage] = useState(false)

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


    // Filtrar - Validação //
    // Irá comparar os dados do formulário com o schema definido no arquivo schema.js //
    async function handleFiltersSubmit() {
        loadFavorites()

        try {
            Schema.validate({ time })
                .then(async _ => {
                    const response = await api.get('classes', {
                        params: {
                            subject,
                            week_day: week_dayIndex,
                            time
                        }
                    })

                    setTeachers(response.data)
                    setIsFiltersVisible(false)
                })
                .catch(e => {

                    // Exibirá um aviso caso a validação falhe //
                    setShowMessage(true)
                    setMessage(e.errors)

                    setTimeout(() => {
                        setShowMessage(false)
                    }, 4500)
                })
        } catch (e) {
            alert(e)
        }
    }

    // Esconde ou exibe o formulario de filtrar //
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
                            <Icon name='filter' size={20} color='#04D361' />
                            <Text style={styles.filterText}>Filtrar por dia, hora e matéria</Text>
                            <Icon name='chevron-down' size={20} color='#A380F6' />
                        </BorderlessButton>
                    </View>
                }>

                {
                    isFilterVisible && (

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
                                <Icon name='search' size={20} color='#FFF' />
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

                {
                    teachers.length !== 0 ?
                        <View style={styles.withResults}>
                            <Icon name='alert-triangle' size={30} color='#6A6180'/>
                            <Text style={styles.withResultsMessage}>
                                Estes são todos os resultados
                            </Text>
                        </View>
                        :
                        <View style={styles.withoutResults}>
                            <Icon name='users' size={75} color='#C1BCCC' />
                            <Text style={styles.withoutResultsMessage}>
                                Sem resultados
                            </Text>
                        </View>
                }

            </ScrollView>

            {
                showMessage ? <ErrorMessage text={message} /> : null
            }

        </View>
    )
}

export default TeacherList; 